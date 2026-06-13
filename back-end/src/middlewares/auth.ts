import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AppError } from "../errors/AppError";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
export interface AutheReqest extends Request {
  user?: any;
}
export const authenticate = (
  req: AutheReqest,
  res: Response,
  next: NextFunction,
) => {
  console.log(req.headers.authorization + "=======================");
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    // return res.status(401).json({ messag: "Access token is missing" });
    console.log("Access token is missing---------");
    throw new AppError("Access token is missing", 401);
  }
  const secretoftoken = authHeader.split(" ")[1];

  console.log(secretoftoken);

  try {
    console.log("/////////////////");
    const playLode = jwt.verify(secretoftoken, JWT_SECRET);
    console.log("/////////////////");

    req.user = playLode;
    next();
  } catch (error) {
    console.error(error);
    // res.status(401).json({ message: "Invalid or expire token..!" });
    throw new AppError("Invalid or expire token..!", 401);
  }
};
