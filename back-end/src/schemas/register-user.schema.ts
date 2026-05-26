import { z } from "zod";

// Register Schema
export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),

    email: z.email({ message: "Please enter a correct email address" }),

    password: z.string().min(5, {
      message: "Password must contain at least 5 characters",
    }),

    nic: z.string().regex(/^([0-9]{9}[vVxX]|[0-9]{12})$/, {
      message: "Please enter a valid NIC number",
    }),
    poneNumber: z
      .string()
      .min(10, { message: "Phone number must be 10 digits" })
      .max(10, { message: "Phone number must be 10 digits" }),

    address: z.string().min(5, { message: "Address is required" }),
  }),
});
