import { Document, model, Schema } from "mongoose";

export interface IRequest extends Document {
  reqestId: string;
  grupId: string;
  grupAdminId: string;
  memberEmail: string;
  memberRespons: string;
  createDateTime: string;
}

const reqestSchema = new Schema<IRequest>({
  reqestId: { type: String, required: true, unique: true },
  grupId: { type: String, required: true },
  grupAdminId: { type: String, required: true },
  memberEmail: { type: String, required: true },
  memberRespons: { type: String, required: true },
  createDateTime: { type: String, required: true },
});

const RequestModel = model<IRequest>("Request", reqestSchema);

export default RequestModel;
