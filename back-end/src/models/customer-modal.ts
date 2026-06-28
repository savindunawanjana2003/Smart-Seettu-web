import { Document, model, Schema } from "mongoose";
export interface Icustomer extends Document {
  name: string;
  email: string;
  password: string;
  nic: string;
  poneNumber: string;
  address: string;
  resetPasswrod?: string;
  otp?: string;
  isOnline?: boolean;
  accountHoldername?: string;
  bankname?: string;
  branchname?: string;
  bankaccountnumber?: string;
  branchcode?: string;
}

const custormerSchema = new Schema<Icustomer>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nic: { type: String, required: true, unique: true },
    poneNumber: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    isOnline: { type: Boolean, default: false },
    resetPasswrod: { type: String },
    otp: { type: String },
    accountHoldername: { type: String },
    bankname: { type: String },
    branchname: { type: String },
    bankaccountnumber: { type: String },
    branchcode: { type: String },
  },
  {
    timestamps: true,
  },
);

const CustormerModel = model<Icustomer>("customer", custormerSchema);
export default CustormerModel;
