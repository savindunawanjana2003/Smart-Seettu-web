import express from "express";
import cors from "cors";
// import mongoose from "mongoose";
import dotenv from "dotenv";
import Authrouter from "./routes/auth-custormer-router";
import Gruprouter from "./routes/group-router";
import Reqestrouter from "./routes/reqest-router";
import Custormerouter from "./routes/customer-router";
import Airouter from "./routes/ai-router";
import Contact from "./routes/contact";
import ongoinRouter from "./routes/ongoin-router";

import http from "http";
import { Server } from "socket.io";

import { globalErrorHandler } from "./middlewares/global-Error-Handler";
import { connection } from "./config/db";
import customerModal from "./models/customer-modal";

dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();
// ,
app.set("trust proxy", 1);
app.use(cors());
app.use(express.json());

// Add this route for testing
app.get("/", (req, res) => {
  // res.send(req);
  console.log(req)
});

// ==================== Custom Request Logger Middleware ====================
app.use((req, res, next) => {
  console.log(`\n================== [ NEW REQUEST ] ==================`);
  console.log(`Method: ${req.method}`);
  console.log(`URL: ${req.originalUrl}`);
  console.log(`Body:`, req.body);
  console.log(`=====================================================\n`);
  next();
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
  transports: ["websocket", "polling"],
});

app.set("io", io);

// DB Operations
const getUser = async (email: string) => {
  return await customerModal.findOne({ email });
};

const updatecustomerOfflineStetus = async (email: string) => {
  console.log(
    "Ok  updatecustomerOfflineStetus funshion ejke triger wenawa e kiyanna db eka update wenna oneee =================",
  );
  await customerModal.findOneAndUpdate(
    { email },
    { isOnline: false },
    { new: true },
  );
  console.log(
    "Ok  updatecustomerOfflineStetus funshion ejke triger wenawa e kiyanna db eka update wenna oneee =================",
  );
};

const updatecustomerOnelineStetus = async (email: string) => {
  await customerModal.findOneAndUpdate(
    { email },
    { isOnline: true },
    { new: true },
  );
};

// Memory In-Memory Storage for Tracking
const onlineUsers: { [email: string]: number } = {};
const disconnectTimers: { [email: string]: NodeJS.Timeout } = {};

// ==================== Socket Connection Logic ====================
io.on("connection", async (socket) => {
  const curentUseremail = socket.handshake.query.userEmail as string;
  console.log(socket.id);

  if (!curentUseremail) {
    console.log("Connection rejected: No userEmail provided");
    return socket.disconnect();
  }

  (socket as any).email = curentUseremail;
  console.log(` Tab connected: ${socket.id} for ${curentUseremail}`);

  if (disconnectTimers[curentUseremail]) {
    clearTimeout(disconnectTimers[curentUseremail]);
    delete disconnectTimers[curentUseremail];
    console.log(
      ` Disconnect timer cleared for ${curentUseremail} (User reconnected/refreshed)`,
    );
  }

  if (!onlineUsers[curentUseremail]) {
    onlineUsers[curentUseremail] = 0;
  }
  onlineUsers[curentUseremail]++;

  if (onlineUsers[curentUseremail] === 1) {
    await updatecustomerOnelineStetus(curentUseremail);

    io.emit("backend-updated", {
      message: "User status updated to online",
      type: "CUSTOMER_ONLINE",
      email: curentUseremail,
    });

    console.log(`User ${curentUseremail} is now fully ONLINE`);
  }

  // ==================== Disconnect Logic ====================
  socket.on("disconnect", async () => {
    console.log("mokek hari off ine giyaaaaaaa ==================");
    const email = (socket as any).email;
    console.log(` Tab disconnected: ${socket.id} for ${email}`);

    if (email && onlineUsers[email]) {
      onlineUsers[email]--;

      // Active tabs okkoma wahilanam thiyenne
      if (onlineUsers[email] === 0) {
        console.log(`Starting offline timeout (7s) for ${email}...`);

        disconnectTimers[email] = setTimeout(async () => {
          const curuntUser = await getUser(email);

          if (curuntUser) {
            await updatecustomerOfflineStetus(email);
            delete onlineUsers[email];
            delete disconnectTimers[email];

            io.emit("backend-updated", {
              message: "User is now offline",
              type: "SHOCKET_DISCONECTED",
            });
            console.log(`User ${email} is now fully OFFLINE`);
          }
        }, 7000);
      } else {
        console.log(
          `User ${email} still has ${onlineUsers[email]} tab(s) open.`,
        );
        io.emit("backend-updated", {
          message: "Active tabs updated",
          type: "CUSTOMER_ONLINE",
          email: email,
        });
      }
    }
  });
});

// ==================== API Routes Setup ====================
app.use("/api/v1/auth", Authrouter);
app.use("/api/v1/grup", Gruprouter);
app.use("/api/v1/reqest", Reqestrouter);
app.use("/api/v1/customer", Custormerouter);
app.use("/api/v1/ai", Airouter);
app.use("/api/v1/contact", Contact);
app.use("/api/v1/ongoin", ongoinRouter);
// Global Error Handling Middleware
app.use(globalErrorHandler);

// ==================== Server Start ====================
const startSever = async (): Promise<void> => {
  try {
    await connection();

    server.listen(PORT, () => {
      console.log(` Server is running on port: ${PORT} `);
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
