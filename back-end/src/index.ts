import express from "express";
import cros from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Authrouter from "./routes/auth-custormer-router";
import { globalErrorHandler } from "./middlewares/global-Error-Handler";
import { connection } from "./config/db";
import { AppError } from "./errors/AppError";

// ===
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// =====express siting
app.set("trust proxy", 1);
app.use(cros());
app.use(express.json());

app.use("/api/v1/auth", Authrouter);
// app.use();

// ============Global Error Handling Middleware (ඕනෑම Route එකක Error එකක් ආවොත්
app.use(globalErrorHandler);
const startSever = async (): Promise<void> => {
  try {
    await connection();

    const server = app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT} `);
    });

    server.on("error", (err: any) => {
      console.error("Server network error: ", err);
      process.exit(1);
    });
  } catch (error) {
    console.error("Database connection error: ", error);
    process.exit(1);
  }
};

startSever();
