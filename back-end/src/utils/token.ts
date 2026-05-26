import { Iuser } from "../models/user-profile"; // export
import jwt from "jsonwebtoken"; // default export
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

export const singAccesstoken = (user: Iuser): string => {
  return jwt.sign(
    {
      sub: user._id.toString(),
      roles: user.roles,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: "60m" },
  );
};

export const signRefreshToken = (user: Iuser): string => {
  return jwt.sign(
    {
      sub: user._id.toString(),
    },
    JWT_REFRESH_SECRET,
    { expiresIn: "7d" },
  );
};
