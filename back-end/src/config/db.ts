import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connection = async (): Promise<void> => {
  try {
    const dburl = process.env.MONGO_URL as string;

    if (!dburl) {
      throw new Error("MONGO_URL is not defined in environment variables.");
    }

    const options: mongoose.ConnectOptions = {
      autoIndex: process.env.NODE_ENV !== "production",
    };

    console.log("Trying to connect...");
    const conn = await mongoose.connect(dburl, options);

    console.log(`MongoDB Connected: ${conn.connection.host}:`);
  } catch (error) {
    console.error(error);
    console.error("MongoDB Connection Error:", error);
    setTimeout(connection, 5000);
    // process.exit(1); praduction lewal meka hodai develop ment time danna epa
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
    }
  };

  process.on("SIGINT", () => grecefrulshutdown("SIGINT"));
  process.on("SIGITERM", () => grecefrulshutdown("SIGITERM"));
};
// =============================

// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

// const dburl = process.env.MONGO_URL as string;

// if (!dburl) {
//   throw new Error("MONGO_URL is not defined in environment variables.");
// }

// mongoose.connection.on("connected", () => {
//   console.log(" MongoDB successfully connected to the database.");
// });

// mongoose.connection.on("disconnected", () => {
//   console.log("MongoDB connection disconnected.");
// });

// mongoose.connection.on("error", (err) => {
//   console.error(`MongoDB internal error: ${err.message}`);
// });

// export const connection = async (): Promise<void> => {
//   try {
//     const options: mongoose.ConnectOptions = {
//       autoIndex: process.env.NODE_ENV !== "production",
//     };

//     console.log(" Trying to connect to MongoDB...");

//     const conn = await mongoose.connect(dburl, options);
//     console.log(`MongoDB Connected Host: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(" Critical: MongoDB Initial Connection Error:", error);

//     process.exit(1);
//   }
// };

// const gracefulShutdown = async (signal: string) => {
//   try {
//     await mongoose.connection.close();
//     console.log(`MongoDB connection closed through ${signal}`);
//     process.exit(0);
//   } catch (error) {
//     console.error("Error during MongoDB graceful shutdown:", error);
//     process.exit(1);
//   }
// };

// process.on("SIGINT", () => gracefulShutdown("SIGINT"));
// process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
