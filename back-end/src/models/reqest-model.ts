import { Document, model, Schema } from "mongoose";

export interface Ireqest extends Document {
  reqestId: string;
  grupId: string;
  grupAdminId: string;
  memberRespons: string;
  createDateTime: string;
}

const reqestSchema = new Schema<Ireqest>({
  reqestId: { type: String, required: true, unique: true },
  grupId: { type: String, required: true, unique: true },
  grupAdminId: { type: String, required: true },
  memberRespons: { type: String, required: true },
  createDateTime: { type: String, required: true },
});

const reqestModel = model<Ireqest>("reqests", reqestSchema);
export default reqestModel;

// reqestId ekak denn amekatath naththn unikly haduna ganna bari wenawa

//if admin send the reqest each member, in on time save the  new data in the reqest collection, and after the  come respons
// chek  who accsept the reqest  if accsept, apudete the data row in the collection (memberRespons:"accespt" or memberRespons:"not accespt")
//after the come reqest  chek this  acoding to the  memberRespons, the system desaide,  as  does member incloud the grup
//respons eka enakota allredy reqest eka db eke save wela thiyenne  memberRespons eka difolt "not accsept" thiyenne  respons eke  accsept thiyei
// nam  row eka update karala  member grup ekata add karanawa

//  respons eka allaganna hama welema triger mena lesa   funshion ekak  thiyenna one  eken karanne   reqest ekak confirm kara nam   member grup ekata add karanawa  mekedi wenne grup collection ekata  member ge id eka dana ke
