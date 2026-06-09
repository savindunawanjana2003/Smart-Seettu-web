import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { AppError } from "../errors/AppError";
import dotenv from "dotenv";
import { dot } from "node:test/reporters";
import { error } from "node:console";

dotenv.config();
export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    console.log("=============77======" + err.message);
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  } else {
    console.log("=================88==" + err.message);

    res.status(err.statusCode).json({
      status: err.status,
      message: err.isOperational
        ? err.message
        : "Something went wrong inside the server",
    });
  }
};
