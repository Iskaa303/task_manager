import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ID, Query } from "node-appwrite";
import { z } from "zod";

import { sessionMiddleware } from "@/lib/session-middleware";
import { DATABASE_ID, TASKS_ID } from "@/config";

import { createTaskSchema } from "../schemas";
import { Task, TaskStatus } from "../types";

const app = new Hono()
  .delete(
    "/:taskId",
    sessionMiddleware,
    async (c) => {
      const user = c.get("user");
      const databases = c.get("databases");
      const { taskId } = c.req.param();

      const task = await databases.getDocument<Task>(
        DATABASE_ID,
        TASKS_ID,
        taskId
      );

      if (task.userId !== user.$id) {
        return c.json(
          { error: "Unauthorized to delete this task" },
          401
        );
      }

      await databases.deleteDocument(
        DATABASE_ID,
        TASKS_ID,
        taskId
      );

      return c.json({ data: { $id: task.$id } });
    }
  )
  .get(
    "/",
    sessionMiddleware,
    zValidator(
      "query",
      z.object({
        status: z.enum(TaskStatus).nullish(),
        search: z.string().nullish(),
        dueDate: z.string().nullish(),
        userId: z.string().nullish(),
      })
    ),
    async (c) => {
      const databases = c.get("databases");

      const {
        status,
        search,
        dueDate,
        userId
      } = c.req.valid("query");

      const query = [
        Query.orderDesc("$createdAt"),
      ]

      if (status) {
        console.log("status", status);
        query.push(Query.equal("status", status));
      }

      if (dueDate) {
        console.log("dueDate", dueDate);
        query.push(Query.equal("dueDate", dueDate));
      }

      if (search) {
        console.log("search", search);
        query.push(Query.search("name", search));
      }

      if (userId) {
        query.push(Query.equal("userId", userId));
      }

      const tasks = await databases.listDocuments<Task>(
        DATABASE_ID,
        TASKS_ID,
        query
      );

      const populatedTasks = tasks.documents.map((task) => {
        return {
          ...task,
        };
      });

      return c.json({
        data: {
          ...tasks,
          documents: populatedTasks,
        },
      });
    }
  )
  .patch(
    "/:taskId",
    sessionMiddleware,
    zValidator("json", createTaskSchema.partial()),
    async (c) => {
      const user = c.get("user");
      const databases = c.get("databases");
      const {
        name,
        status,
        dueDate,
        description,
      } = c.req.valid("json");
      const { taskId } = c.req.param();

      const existingTask = await databases.getDocument<Task>(
        DATABASE_ID,
        TASKS_ID,
        taskId,
      );

      if (existingTask.userId !== user.$id) {
        return c.json(
          { error: "Unauthorized to see this task" },
          401
        );
      }
      
      const task = await databases.updateDocument<Task>(
        DATABASE_ID,
        TASKS_ID,
        taskId,
        {
          name,
          status,
          dueDate,
          description,
        }
      );

      return c.json({ data: task });
    }
  ).post(
    "/",
    sessionMiddleware,
    zValidator("json", createTaskSchema),
    async (c) => {
      const user = c.get("user");
      const databases = c.get("databases");
      const {
        name,
        status,
      } = c.req.valid("json");
      let { dueDate } = c.req.valid("json");

      if (!dueDate) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dueDate = tomorrow;
      }

      const highestPositionTask = await databases.listDocuments(
        DATABASE_ID,
        TASKS_ID,
        [
          Query.equal("status", status),
          Query.orderDesc("position"),
          Query.limit(1),
        ],
      );

      const newPosition =
        highestPositionTask.documents.length > 0
          ? highestPositionTask.documents[0].position + 1000
          : 1000;
      
      const task = await databases.createDocument(
        DATABASE_ID,
        TASKS_ID,
        ID.unique(),
        {
          name,
          status,
          dueDate,
          position: newPosition,
          userId: user.$id,
        }
      );

      return c.json({ data: task });
    }
  )
  .get(
    "/:taskId",
    sessionMiddleware,
    async (c) => {
      const currentUser = c.get("user");
      const databases = c.get("databases");
      const { taskId } = c.req.param();

      const task = await databases.getDocument<Task>(
        DATABASE_ID,
        TASKS_ID,
        taskId,
      );

      if (task.userId !== currentUser.$id) {
        return c.json(
          { error: "Unauthorized" },
          401
        );
      }

      return c.json({
        data: {
          ...task,
        },
      });
    }
  )
  .post(
    "/bulk-update",
    sessionMiddleware,
    zValidator(
      "json",
      z.object({
        tasks: z.array(
          z.object({
            $id: z.string(),
            status: z.enum(TaskStatus),
            position: z.number().int().positive().min(1000).max(1e6),
          })
        )
      })
    ),
    async (c) => {
      const databases = c.get("databases");
      const user = c.get("user");
      const { tasks } = c.req.valid("json");

      const tasksToUpdate = await databases.listDocuments<Task>(
        DATABASE_ID,
        TASKS_ID,
        [
          Query.contains("$id", tasks.map((task) => task.$id)),
        ]
      );

      const userIds = tasksToUpdate.documents.map((task) => task.userId);
      if (!userIds.includes(user.$id)) {
        return c.json(
          { error: "Unauthorized to update these tasks" },
          401
        );
      }

      const updatedTasks = await Promise.all(
        tasks.map(async (task) => {
          const { $id, status, position } = task;
          return databases.updateDocument<Task>(
            DATABASE_ID,
            TASKS_ID,
            $id,
            {
              status,
              position,
            }
          );
        })
      );

      return c.json({ data: updatedTasks });
    }
  );

export default app;
