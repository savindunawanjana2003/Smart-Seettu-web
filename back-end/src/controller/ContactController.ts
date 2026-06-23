import bcrypt from "bcryptjs";
import customerModal from "../models/customer-modal";
import { Request, Response } from "express";

export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await customerModal.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching customers", error });
  }
};

export const addCustomer = async (req: Request, res: Response) => {
  try {
    const c = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(c.password, salt);

    const customer = {
      name: c.name,
      email: c.email,
      password: hashedPassword,
      nic: c.nic,
      poneNumber: c.poneNumber,
      address: c.address,
    };

    const newCustomer = new customerModal(customer);
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(400).json({ message: "Error creating customer", error });
  }
};
