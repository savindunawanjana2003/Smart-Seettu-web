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
}

const custormerSchema = new Schema<Icustomer>(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nic: { type: String, required: true, unique: true },
    poneNumber: { type: String, required: true, unique: true },
    address: { type: String, required: true, unique: true },
    resetPasswrod: { type: String },
    otp: { type: String },
  },
  {
    timestamps: true,
  },
);

const CustormerModel = model<Icustomer>("customer", custormerSchema);
export default CustormerModel;
