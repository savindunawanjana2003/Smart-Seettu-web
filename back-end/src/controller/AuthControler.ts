import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import CustormerModel from "../models/customer-modal";
import { singAccesstoken, signRefreshToken } from "../utils/token";
import { AppError } from "../errors/AppError";

export const login = async (req: Request, res: Response) => {
  console.log("Enawa methanata okkkkkkkkkkkkkkkkkk");
  const { email, password } = req.body;
  // const { email, password } = req.body;

  const user = await CustormerModel.findOne({ email });
  if (!user) {
    throw new AppError("Invalid credentials..!(Invalid Email)", 401);
  }

  const isValid = await bcrypt.compare(password, user?.password);
  if (!isValid) {
    throw new AppError("Invalid credentials..!(Invalid password)", 401);
  }

  const accessToken = singAccesstoken(user);
  const refreshToken = signRefreshToken(user);
  console.log(
    "=========+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++",
  );

  console.log(accessToken);
  console.log("==========================");
  console.log(refreshToken);

  res.status(200).json({
    message: "Success",
    data: {
      email: user?.email,
      name: user?.name,
      accessToken: accessToken,
      refreshToken: refreshToken,
    },
  });
};
