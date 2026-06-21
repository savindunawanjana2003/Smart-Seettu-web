import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Authrouter from "./routes/auth-custormer-router";
import Gruprouter from "./routes/group-router";
import Reqestrouter from "./routes/reqest-router";
import Custormerouter from "./routes/customer-router";
import Airouter from "./routes/ai-router";
import http from "http";
import { Server } from "socket.io";

import { globalErrorHandler } from "./middlewares/global-Error-Handler";
import { connection } from "./config/db";
import customerModal from "./models/customer-modal";

dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.set("trust proxy", 1);
app.use(cors());
app.use(express.json());
// ====================
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
  transports: ["websocket", "polling"],
});

// ==============Socket.io setup==============
const getUser = async (email: any) => {
  const user = await customerModal.findOne({ email });
  if (user) return user;
};

const updatecustomerOfflineStetus = async (email: any) => {
  await customerModal.findOneAndUpdate(
    { email },
    { isOnline: false },
    { new: true },
    // { returnDocument: "after" },
  );
};

const updatecustomerOnelineStetus = async (email: any) => {
  await customerModal.findOneAndUpdate(
    { email },
    { isOnline: true },
    { new: true },

    // { returnDocument: "after" },
  );
};

app.set("io", io);

const onlineUsers: { [email: string]: number } = {};

io.on("connection", async (socket) => {
  const curentUseremail: any = socket.handshake.query.userEmail;

  if (!curentUseremail) {
    console.log(" Connection rejected: No userEmail provided");
    return socket.disconnect();
  }

  (socket as any).email = curentUseremail;
  console.log(`Tab connected: ${socket.id} for ${curentUseremail}`);

  if (!onlineUsers[curentUseremail]) {
    onlineUsers[curentUseremail] = 0;
  }
  onlineUsers[curentUseremail]++;

  if (onlineUsers[curentUseremail] === 1) {
    await updatecustomerOnelineStetus(curentUseremail);

    io.emit("backend-updated", {
      message: "User offline status updated",
      type: "CUSTOMER_ONLINE",
    });

    console.log(`User ${curentUseremail} is now fully ONLINE`);
  }
  // https://docs.google.com/document/d/1_7_9q883s3peAz4eapU3EkjaEzguesesUzomGk6F5WE/edit?tab=t.0
  socket.on("disconnect", async () => {
    const email = (socket as any).email;
    console.log(` Tab disconnected: ${socket.id} for ${email}`);

    if (email && onlineUsers[email]) {
      onlineUsers[email]--;

      setTimeout(async () => {
        if (onlineUsers[email] === 0) {
          const curuntUser = await getUser(email);

          if (curuntUser) {
            await updatecustomerOfflineStetus(email);
            delete onlineUsers[email];

            io.emit("backend-updated", {
              message: "User is now offline",
              type: "SHOCKET_DISCONECTED",
            });
            console.log(`User ${email} is now fully OFFLINE`);
          }
        } else {
          console.log(
            ` User ${email} still has ${onlineUsers[email]} tab(s) open.`,
          );
          io.emit("backend-updated", {
            message: "Active tabs updated",
            type: "CUSTOMER_ONLINE",
          });
        }
      }, 7000);
    }
  });
});

// =========== setup==============
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

    server.listen(PORT, () => {
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
