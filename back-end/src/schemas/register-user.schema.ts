import { z } from "zod";

// 1. Register Schema
export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.email(),
    password: z.string().min(5),
    role: z.string().min(3),
  }),
});
