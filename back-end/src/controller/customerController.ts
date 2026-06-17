import { NextFunction, Request, Response } from "express";
import customerModal from "../models/customer-modal";
import { AppError } from "../errors/AppError";
import bcrypt from "bcryptjs";
import { singAccesstoken, signRefreshToken } from "../utils/token";
import CustormerModel from "../models/customer-modal";

export const registerCustomer = async (req: Request, res: Response) => {
  const { id, name, email, password, nic, poneNumber, address } = req.body;

  const user1 = await customerModal.findOne({ email });
  console.log("===========================");
  if (!user1) {
  } else {
    throw new AppError(
      "User email Already exit avelable please login with your user credentials",
      400,
    );
  }

  const user2 = await customerModal.findOne({ poneNumber });
  console.log(user2);
  console.log("===========================");
  if (!user2) {
  } else {
    throw new AppError(
      "User poneNumber Already exit avelable please login with your user credentials",
      400,
    );
  }

  const user3 = await customerModal.findOne({ nic });
  if (!user3) {
  } else {
    throw new AppError(
      "User Nnic Already exit avelable please login with your user credentials",
      400,
    );
  }
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
  console.log(
    "login ekata enawa ===========================================0000000000000000",
  );
  console.log(req.body);
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
  res.status(200).json({
    message: "Success",
    data: {
      id: customer.id,
      email: customer?.email,
      name: customer?.name,
      poneNumber: customer?.poneNumber,
      accessToken,
      refreshToken,
    },
  });
};

export const updateCustomerOnlineStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.body;

    const customer = await customerModal.findOneAndUpdate(
      { email },
      { isOnline: true },
      { new: true }, // updated document will be return in hear
    );

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found plesae register firstly",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Customer online status updated",
      data: customer,
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateCustomerOfflineStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.body;

    const customer = await customerModal.findOneAndUpdate(
      { email },
      { isOnline: false },
      { new: true }, // updated document එක return කරනවා
    );

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found plesae register in the sait",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Customer online status updated",
      data: customer,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await customerModal.find();
    res.status(200).json({
      success: true,
      data: customers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve customers",
    });
  }
};

export const getAllOnlineMembers = async (req: Request, res: Response) => {
  try {
    const members = await customerModal.find({
      isOnline: true,
    });

    res.status(200).json({
      Message: "Online members fetched successfully!",
      count: members.length,
      data: members,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      Message: "Error fetching online members!",
      Error: error.message,
    });
  }
};
