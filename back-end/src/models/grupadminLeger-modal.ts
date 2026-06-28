import { Document, model, Schema, Types } from "mongoose";

export interface ILedger extends Document {
  admin_id: Types.ObjectId;
  group_id: Types.ObjectId;
  transaction_id: string;
  amount: number;
  type: "CREDIT" | "DEBIT";
  month: string;
  description: string;
}

const ledgerSchema = new Schema<ILedger>(
  {
    admin_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    group_id: { type: Schema.Types.ObjectId, ref: "Group", required: true },
    transaction_id: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ["CREDIT", "DEBIT"], required: true },
    month: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const LedgerModel = model<ILedger>("Ledger", ledgerSchema);

export default LedgerModel;
