import { z } from "zod";
// 2. Login Schema
export const loginSchema = z.object({
  body: z.object({
    email: z.email("Please enter corect email with corect patten"),
    password: z.string().min(5, {
      message: "need leters atlest 5 for password pleas check it ",
    }),
  }),
});
