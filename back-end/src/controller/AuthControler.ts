// import { Request, Response } from "express";
// import bcrypt from "bcryptjs";
// import CustormerModel from "../models/customer-modal";
// import { singAccesstoken, signRefreshToken } from "../utils/token";
// import { AppError } from "../errors/AppError";

// export const login = async (req: Request, res: Response) => {
//   const { email, password } = req.body;
//   // const { email, password } = req.body;

//   const user = await CustormerModel.findOne({ email });
//   console.log("user -------------------------->: " + user);

//   if (!user) {
//     throw new AppError("Invalid credentials..!(Invalid Email)", 401);
//   }

//   const isValid = await bcrypt.compare(password, user?.password);
//   if (!isValid) {
//     throw new AppError("Invalid credentials..!(Invalid password)", 401);
//   }

//   const accessToken = singAccesstoken(user);
//   const refreshToken = signRefreshToken(user);

//   res.status(200).json({
//     message: "Success",
//     data: {
//       email: user?.email,
//       name: user?.name,
//       poneNumber: user?.poneNumber,
//       accessToken: accessToken,
//       refreshToken: refreshToken,
//     },
//   });
// };
