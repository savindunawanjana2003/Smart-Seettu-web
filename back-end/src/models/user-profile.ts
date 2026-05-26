// https://docs.google.com/document/d/1_7_9q883s3peAz4eapU3EkjaEzguesesUzomGk6F5WE/edit?tab=t.0#bookmark=id.m52esder28br

import { Schema, model, Document } from "mongoose";

export enum UserRole {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  USER = "USER",
}

export interface Iuser extends Document {
  name: string;
  email: string;
  password: string;
  roles: UserRole[];
  approved: boolean;
}
const userSchema = new Schema<Iuser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: {
      type: [String],
      enum: Object.values(UserRole),
      default: [UserRole.USER],
    },
    approved: { type: Boolean, required: true },
  },
  { timestamps: true },
);

export const UserModel = model<Iuser>("user_deatiles", userSchema);
