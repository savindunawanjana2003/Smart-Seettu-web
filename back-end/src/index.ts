import express, { Application } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { connection } from "./config/db";
import { globalErrorHandler } from "./middlewares/global-Error-Handler";
// Routers Import
// =======================
import Authrouter from "./routers/auth-router";

// ============1. Env Configuration===========
dotenv.config({ path: "./key.env" });

const PORT = process.env.PORT || 5000;
const app = express();

// ============ 2. Express Settings ===========
// Nginx / Heroku / AWS Load Balancer වැනි Proxies හරහා එන ඇත්තම User IP එක හඳුනා ගැනීමට
app.set("trust proxy", 1);
//============first global midle wares========
app.use(cros());
app.use(express.json());

// =============routing========
app.use("/backendapi/v1/auth", Authrouter);

// ============Global Error Handling Middleware (ඕනෑම Route එකක Error එකක් ආවොත් මෙතනට අහුවෙනවා)
// uda thiyena ruter ekak  kohe hari ahlak awith methana thiytena midle ware triger wenna globle lesa hadanna one phala

app.use(globalErrorHandler);

const startServer = async (): Promise<void> => {
  try {
    await connection();
    // console.log("Database connected successfully... ");

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

startServer();
