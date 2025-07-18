import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ID, Query } from "node-appwrite";
import { z } from "zod";

import { sessionMiddleware } from "@/lib/session-middleware";
import { DATABASE_ID, TASKS_ID } from "@/config";
import { createAdminClient } from "@/lib/appwrite";

import { createTaskSchema } from "../schemas";
import { TaskStatus } from "../types";

const app = new Hono()
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
        console.log("userId", userId);
        query.push(Query.equal("userId", userId));
      }

      const tasks = await databases.listDocuments(
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
  .post(
    "/",
    sessionMiddleware,
    zValidator("json", createTaskSchema),
    async (c) => {
      const user = c.get("user");
      const databases = c.get("databases");
      let {
        name,
        status,
        dueDate
      } = c.req.valid("json");

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
  );

export default app;
