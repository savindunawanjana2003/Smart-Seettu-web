import { Document, model, Schema, Types } from "mongoose";

export interface IPayment extends Document {
  group_id: Types.ObjectId;
  member_contact: string;
  amount: number;
  expectedMonthlySeettuAmount: number;
  transaction_id: string; // PayHere Transaction ID
  payment_status: "SUCCESS" | "PENDING" | "FAILED";
  payment_date: Date;
}

const paymentSchema = new Schema<IPayment>(
  {
    group_id: { type: Schema.Types.ObjectId, ref: "Group", required: true },
    member_contact: { type: String, required: true },
    amount: { type: Number, required: true },
    expectedMonthlySeettuAmount: { type: Number, required: true },
    transaction_id: { type: String, required: true },
    payment_status: {
      type: String,
      enum: ["SUCCESS", "PENDING", "FAILED"],
      default: "PENDING",
    },
    payment_date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);

const PaymentModel = model<IPayment>("Payment", paymentSchema);

export default PaymentModel;
