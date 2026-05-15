import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import customerRouter from "./routes/customerRouter";
import groupRouter from "./routes/groupRouter";

const app = express();
dotenv.config();
app.use(express.json());
app.use("/api/v1/custormer", customerRouter);
app.use("/api/v1/group", groupRouter);

const db_url = process.env.MONGO_URL as string;
const port_number = Number(process.env.PORT);

mongoose
  .connect(db_url)
  .then(() => {
    console.log("Mongo-Db conected... ");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(port_number, () => {
  console.log("server runing port:3000");
});
