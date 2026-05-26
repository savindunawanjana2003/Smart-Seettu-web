import { NextFunction, Request, Response } from "express";
import customerModal from "../models/customer-modal";
import { AppError } from "../errors/AppError";
import bcrypt from "bcryptjs";
import { singAccesstoken, signRefreshToken } from "../utils/token";

export const registerCustomer = async (req: Request, res: Response) => {
  const { id, name, email, password, nic, poneNumber, address } = req.body;

  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const customer = new customerModal({
      id,
      name,
      email,
      password: hashedPassword,
      nic,
      poneNumber,
      address,
    });

    const saveCustormer = await customer.save();
    res.status(201).json({
      Message: "Save succsess fully !",
      data: saveCustormer,
    });
  } catch (error) {
    console.error(error);
    throw new AppError("Save Unsuccsess fully", 500);
    // res.status(500).json({
    //   Message: "Save Unsuccsess fully !",
    // });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const customer = await customerModal.findOne({ email });

  if (!customer) {
    throw new AppError("Invalid credentials..!(Invalid Email)", 401);
  }

  const isValid = await bcrypt.compare(password, customer?.password);

  if (!isValid) {
    throw new AppError("Invalid credentials..!(Invalid password)", 401);
  }

  // const user;

  const accessToken = singAccesstoken(customer);
  const refreshToken = signRefreshToken(customer);
  //in bellow step i didi not insert user role because it's not need hear
  res.status(200).json({
    message: "Success",
    data: {
      email: customer?.email,
      accessToken,
      refreshToken,
    },
  });
};
