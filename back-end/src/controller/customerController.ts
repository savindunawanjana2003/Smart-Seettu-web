import { NextFunction, Request, Response } from "express";
import customerModal from "../models/customer-modal";
import { AppError } from "../errors/AppError";
import bcrypt from "bcryptjs";
import { singAccesstoken, signRefreshToken } from "../utils/token";
import CustormerModel from "../models/customer-modal";

export const registerCustomer = async (req: Request, res: Response) => {
  const { id, name, email, password, nic, poneNumber, address } = req.body;

  try {
    // 1. Email Check
    const user1 = await customerModal.findOne({ email });
    if (user1) {
      return res.status(400).json({ Message: "User email Already exists!" });
    }

    // 2. Phone Check
    const user2 = await customerModal.findOne({ poneNumber });
    if (user2) {
      return res
        .status(400)
        .json({ Message: "User phone number Already exists!" });
    }

    // 3. NIC Check
    const user3 = await customerModal.findOne({ nic });
    if (user3) {
      return res.status(400).json({ Message: "User NIC Already exists!" });
    }

    // 4. Password Hash
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

   
    const customer = new customerModal({
      id: id || `CUST-${Date.now()}`, 
      name,
      email,
      password: hashedPassword,
      nic,
      poneNumber,
      address,
    });

    const saveCustormer = await customer.save();

    console.log("++++++++++++++++++ emite START +++++++++++++++++++++++++++++");
    const io = req.app.get("io");
    if (io) {
      io.emit("backend-updated", {
        message: "A new customer was added! Please refresh.",
        type: "CUSTOMER_ADDED",
      });
      console.log("Broadcasting Success!");
    }
    console.log("++++++++++++++++++ emite END +++++++++++++++++++++++++++++");

    return res.status(201).json({
      Message: "Save successfully!",
      data: saveCustormer,
    });
  } catch (error: any) {
    //  මෙතනදි throw කරන්නේ නැතුව ලස්සනට response එකක් දෙනවා, එතකොට සර්වර් එක crash වෙන්නේ නැහැ!
 
    console.error(error.message || error);

    return res.status(500).json({
      Message: "Save Unsuccessfully!",
      Error: error.message,
    });
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
  console.log("++++++++++++++++++ emite START +++++++++++++++++++++++++++++");
  const io = req.app.get("io");
  if (io) {
    io.emit("backend-updated", {
      message: "A new customer was Loged! Please refresh.",
      type: "CUSTOMER_LOGED",
    });
    console.log("Broadcasting Success!");
  }
  console.log("++++++++++++++++++ emite END +++++++++++++++++++++++++++++");
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

// export const updatecustomerOfflineStetus = async (email: any) => {
//   await customerModal.findOneAndUpdate(
//     { email },
//     { isOnline: false },
//     { returnDocument: "after" },
//   );

//   console.log("++++++++++++++++++ emite START +++++++++++++++++++++++++++++");
//   const io = req.app.get("io");
//   if (io) {
//     io.emit("backend-updated", {
//       message: "A new customer was Loged! Please refresh.",
//       type: "CUSTOMER_LOGED",
//     });
//     console.log(" Broadcasting Success!");
//   }
//   console.log("++++++++++++++++++ emite END +++++++++++++++++++++++++++++");
// };

export const moveToTheDashBod = async (req: Request, res: Response) => {

  console.log("++++++++++++++++++ emite START +++++++++++++++++++++++++++++");
  const io = req.app.get("io");
  if (io) {
    io.emit("backend-updated", {
      message: "A new customer was Loged! Please refresh.",
      type: "CUSTOMER_LOGED",
    });
    console.log(" Broadcasting Success!");
  }
  console.log("++++++++++++++++++ emite END +++++++++++++++++++++++++++++");
};
