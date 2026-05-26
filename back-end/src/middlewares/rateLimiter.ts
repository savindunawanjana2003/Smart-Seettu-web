import rateLimit from "express-rate-limit";
import { Request, Response, NextFunction } from "express";

export const authRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 7,

  handler: (req: Request, res: Response, next: NextFunction) => {
    return res.status(429).json({
      success: false,
      status: 429,
      error: "Too Many Requests",
      message:
        "Too many login attempts from this IP, please try again after 15 minutes.",
    });
  },

  standardHeaders: true,
  legacyHeaders: false,
});
