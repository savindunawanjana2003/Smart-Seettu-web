import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Authrouter from "./routes/auth-custormer-router";
import { globalErrorHandler } from "./middlewares/global-Error-Handler";
import { connection } from "./config/db";
// import { AppError } from "./errors/AppError";

// ===
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// =====express sitingemail
app.set("trust proxy", 1);
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend එකේ URL එක මෙතනට දෙන්න
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);
app.use(express.json());
// app.post("/", (req, res) => {
//   console.log(req.body.email);
//   console.log("000000000000000000000000000000000000000000000000000000000000");
// });
app.use((req, res, next) => {
  console.log(`\n================== [ NEW REQUEST ] ==================`);
  console.log(`Method: ${req.method}`);
  console.log(`URL: ${req.originalUrl}`);
  console.log(`Body:`, req.body); // මෙතනින් තමයි email, password පේන්නේ
  console.log(`=====================================================\n`);
  next(); // 👈 මේක අනිවාර්යයි! නැත්නම් රික්වෙස්ට් එක මෙතනින් හිරවෙනවා.
});

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
