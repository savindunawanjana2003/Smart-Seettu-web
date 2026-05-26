import { Request, Response } from "express";
import customerModal from "../models/customer-modal";
import { AppError } from "../errors/AppError";

export const registerCustomer = async (req: Request, res: Response) => {
  const {
    cid,
    cname,
    cemail,
    cpassword,
    cnic,
    cponeNumber,
    cAddress,
    resetPasswrod,
    cotp,
  } = req.body;

  try {
    const customer = new customerModal({
      cid,
      cname,
      cemail,
      cpassword,
      cnic,
      cponeNumber,
      cAddress,
      resetPasswrod,
      cotp,
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
