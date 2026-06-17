import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Authrouter from "./routes/auth-custormer-router";
import Gruprouter from "./routes/group-router";
import Reqestrouter from "./routes/reqest-router";
import Custormerouter from "./routes/customer-router";
import Airouter from "./routes/ai-router";

import { globalErrorHandler } from "./middlewares/global-Error-Handler";
import { connection } from "./config/db";
// import { AppError } from "./errors/AppError";

// ===
dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.set("trust proxy", 1);
app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:5173", 
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     credentials: true,
//   }),
// );
app.use(express.json());
app.post("/", (req, res) => {});
app.use((req, res, next) => {
  // console.log(req.)
  console.log(`\n================== [ NEW REQUEST ] ==================`);
  console.log(`Method: ${req.method}`);
  console.log(`URL: ${req.originalUrl}`);
  console.log(`Body:`, req.body);
  console.log(`Body:`, req.headers);

  console.log(`=====================================================\n`);
  next();
});

app.use("/api/v1/auth", Authrouter);
app.use("/api/v1/grup", Gruprouter);
app.use("/api/v1/reqest", Reqestrouter);
app.use("/api/v1/customer", Custormerouter);
app.use("/api/v1/ai", Airouter);

// ============Global Error Handling Middleware
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
