import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { AppError } from "../errors/AppError";
import dotenv from "dotenv";
import { dot } from "node:test/reporters";

dotenv.config();
export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // Industry එකේදී Development සහ Production වලදී Response දෙන විදිය වෙනස් කරනවා
  if (process.env.NODE_ENV === "development") {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack, // Dev වලදී විතරක් error එක ආපු තැන (stack trace) පෙන්වනවා
      error: err,
    });
  } else {
    // Production (Live) එකේදී clean response එකක් දෙනවා
    res.status(err.statusCode).json({
      status: err.status,
      message: err.isOperational
        ? err.message
        : "Something went wrong inside the server!",
    });
  }
};
