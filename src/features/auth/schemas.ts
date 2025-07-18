import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required").max(256, "Password must not exceed 256 characters"),
});

export const registerSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(256, "Name must not exceed 256 characters"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters").max(256, "Password must not exceed 256 characters"),
});