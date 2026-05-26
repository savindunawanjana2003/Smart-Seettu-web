import { Icustomer } from "../models/customer-modal"; // export
import jwt from "jsonwebtoken"; // default export
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

export const singAccesstoken = (user: Icustomer): string => {
  return jwt.sign(
    {
      sub: user._id.toString(),
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: "60m" },
  );
};

export const signRefreshToken = (user: Icustomer): string => {
  return jwt.sign(
    {
      sub: user._id.toString(),
    },
    JWT_REFRESH_SECRET,
    { expiresIn: "7d" },
  );
};
