import express from "express";
import cros from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import  {} from ""

// ===
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// =====express siting

// ====== frst global middl ware============
app.use(cros());
app.use(express.json());

//=========routing

// ============Global Error Handling Middleware (ඕනෑම Route එකක Error එකක් ආවොත්
app.use();
