import { z } from "zod";
// 2. Login Schema
export const loginSchema = z.object({
  body: z.object({
    email: z.email("කරුණාකර නිවැරදි Email එකක් ඇතුලත් කරන්න"),
    password: z.string().min(5, {
      message: "Password එකට අවම වශයෙන් අකුරු 6ක්වත් තිබිය යුතුය",
    }),
  }),
});
