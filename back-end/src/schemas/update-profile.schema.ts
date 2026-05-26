import { z } from "zod";
export const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.email(),
    password: z.string().min(6),
    role: z.string().min(3),
  }),
});
