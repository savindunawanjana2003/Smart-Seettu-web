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
// firstly  the addmin must include  as a member with admin tag name in the grup collection
export interface Igrup extends Document {
  gid: string;
  gadminid: string;
  gmemberCount: string;
  members: Imembers[];
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
  gid: { type: String, required: true, unique: true },
  gadminid: { type: String, required: true, unique: true },
  gmemberCount: { type: String, required: true, unique: true },
  members: { type: [memberSchema], required: true, unique: true },
  createDate: { type: String, required: true, unique: true },
});

//  ## members: { type: [memberSchema], required: true, unique: true },  Embedding: අර කලින් හදපු itemSchema එක මෙතනට දැම්මා

const gruoModel = model<Igrup>("grup", grupSchema);
export default gruoModel;
