import { Document, model, Schema } from "mongoose";

//  interface Imembers extends Document {
//   memberId: string;
//   membername: string;
//   contactnumber: string;
//   tagname: string; // is member or admin
// } inCorect        rison==>>
// 1. අයිතමයක් (members) සඳහා Interface එක,
// මෙතන Document එක extend කරන්නේ නැහැ, මොකද මේක වෙනම collection එකක් නෙවෙයි

interface Imembers {
  memberId: string;
  membername: string;
  contactnumber: string;
  tagname: string; // is member or admin
}
// firstly  the admin must include  as a member with admin tag name in the grup collection
export interface Igrup extends Document {
  id: string;
  adminid: string;
  memberCount: string;
  expectedMonthlySeettuAmount: string;
  monthlyContributionPerMember: string;
  seettuDurationInMonths: string;
  members?: Imembers[];
  createDate: string;
}

// subSchema
const memberSchema = new Schema<Imembers>({
  memberId: { type: String, required: true, unique: true },
  membername: { type: String, required: true, unique: true },
  contactnumber: { type: String, required: true, unique: true },
  tagname: { type: String, required: true, unique: true },
});

const grupSchema = new Schema<Igrup>({
  id: { type: String, required: true, unique: true },
  adminid: { type: String, required: true, unique: true },
  memberCount: { type: String, required: true },
  expectedMonthlySeettuAmount: { type: String, required: true }, // masekata ekathu wenna one mulu mudala
  monthlyContributionPerMember: { type: String, required: true, unique: true }, //grup create karapu gaman inne addmin  nisa   masekata ekathu wenna mulu gana  gewanna watenna
  seettuDurationInMonths: { type: String, required: true }, // mulma ekata 1 mounth mokada  member laganata masa gana equl nisa
  members: { type: [memberSchema] },
  createDate: { type: String, required: true, unique: true },
});

//  ## members: { type: [memberSchema], required: true, unique: true },  Embedding: අර කලින් හදපු itemSchema එක මෙතනට දැම්මා

const gruoModel = model<Igrup>("grup", grupSchema);
export default gruoModel;
