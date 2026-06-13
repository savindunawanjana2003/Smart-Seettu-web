import { Document, model, Schema } from "mongoose";
import { string } from "zod";
import { Igrup } from "../types/types";
import { Imembers } from "../types/types";

import { Grupstete } from "../types/types";

// subSchema
const memberSchema = new Schema<Imembers>({
  memberId: { type: String, required: true, unique: true },
  membername: { type: String, required: true },
  contactnumber: { type: String, required: true, unique: true },
  tagname: { type: String, required: true },
});

const grupSchema = new Schema<Igrup>({
  id: { type: String, required: true, unique: true },
  adminid: { type: String, required: true },
  memberCount: { type: String, required: true },
  expectedMonthlySeettuAmount: { type: String, required: true }, // masekata ekathu wenna one mulu mudala
  monthlyContributionPerMember: { type: String, required: true }, //grup create karapu gaman inne addmin  nisa   masekata ekathu wenna mulu gana  gewanna watenna
  seettuDurationInMonths: { type: String, required: true }, // mulma ekata 1 mounth mokada  member laganata masa gana equl nisa
  members: { type: [memberSchema], default: [] },
  grupStete: {
    type: String,
    required: true,
    enum: Object.values(Grupstete),
    default: Grupstete.PENDING,
  },
  createDate: { type: String, required: true },
});

const gruoModel = model<Igrup>("grup", grupSchema);
export default gruoModel;
