import mongoose from "mongoose";
import { promises } from "node:dns";
import dotenv from "dotenv";
dotenv.config();
export const connection = async (): Promise<void> => {
  try {
    const DB_URL = process.env.MONGO_URL as string;

    if (!DB_URL) {
      throw new Error("MONGO_URI is not defined in environment variables.");
    }

    const options: mongoose.ConnectOptions = {
      autoIndex: process.env.NODE_ENV !== "production",
    };

    const conn = await mongoose.connect(DB_URL, options);

    console.log(`MongoDB Connected: ${conn.connection.host}:📡`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  mongoose.connection.on("disconnected", () => {
    console.log("Mongodb connection disconnected.");
  });

  mongoose.connection.on("error", (err) => {
    console.error(` MongoDB internal error: ${err.message}`);
  });
  const grecefrulshutdown = async (signal: string) => {
    try {
      await mongoose.connection.close();
      console.log(`MongoDB connection closed through ${signal}`);
      setTimeout(() => {
        process.exit(0);
      }, 500);
    } catch (error) {
      console.error("Error during MongoDB graceful shutdown:", error);
      process.exit(1);
    }
  };

  process.on("SIGINT", () => grecefrulshutdown("SIGINT"));
  process.on("SIGITERM", () => grecefrulshutdown("SIGITERM"));
};
