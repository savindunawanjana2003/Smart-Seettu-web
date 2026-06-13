// src/middlewares/validateRequest.ts
import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodError } from "zod";
import { AppError } from "../errors/AppError";

export const validateRequest =
  (schema: ZodObject) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({ body: req.body });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Zod error messages ටික එකතු කරලා එක ලස්සන message එකක් හදාගන්නවා
        const errorMessage = error.issues
          .map((issue) => `${issue.path.join(".")} is ${issue.message}`)
          .join(", ");

        // ❌ throw new AppError(...) වෙනුවට:
        // Bad Request නිසා 400 දෙනවා, next() එක ඇතුලට දානවා
        return next(new AppError(errorMessage, 400));
      }
      next(error);
    }
  };
