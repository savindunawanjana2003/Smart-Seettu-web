import { Request, Response } from "express";
import customerModal from "../models/customerModal";

export const saveCustomer = async (req: Request, res: Response) => {
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
    res.status(500).json({
      Message: "Save Unsuccsess fully !",
    });
  }
};
