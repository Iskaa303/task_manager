import z from "zod";

import { TaskStatus } from "./types";

export const createTaskSchema = z.object({
  name: z.string().min(1, "Task name is required"),
  status: z.enum(TaskStatus, "Task status is required" ),
  dueDate: z.coerce.date(),
  description: z.string().optional(),
  userId: z.string(),
});