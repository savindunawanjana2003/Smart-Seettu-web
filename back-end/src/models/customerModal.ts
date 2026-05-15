import { Document, model, Schema } from "mongoose";
export interface Icustomer extends Document {
  cid: string;
  cname: string;
  cemail: string;
  cpassword: string;
  cnic: string;
  cponeNumber: string;
  cAddress: string;
  resetPasswrod: string;
  cotp: string;
}

const custormerSchema = new Schema<Icustomer>({
  cid: { type: String, unique: true },
  cname: { type: String, required: true, unique: true },
  cemail: { type: String, required: true, unique: true },
  cpassword: { type: String, required: true, unique: true },
  cnic: { type: String, required: true, unique: true },
  cponeNumber: { type: String, required: true, unique: true },
  cAddress: { type: String, required: true, unique: true },
  resetPasswrod: { type: String, required: true, unique: true },
  cotp: { type: String, required: true, unique: true },
});

const CustormerModel = model<Icustomer>("customer", custormerSchema);
export default CustormerModel;
