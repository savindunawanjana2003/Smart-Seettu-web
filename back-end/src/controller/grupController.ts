import { Request, Response } from "express";
import groupModel from "../models/groupModal";

export const savegroup = async (req: Request, res: Response) => {
  const { gid, gadminid, gmemberCount, members, createDate } = req.body;

  try {
    const group = new groupModel({
      gid,
      gadminid,
      gmemberCount,
      members,
      createDate,
    });

    const sgroup = await group.save();
    res.status(201).json({
      Message: "Save succsess fully !",
      data: sgroup,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      Message: " Group Save Unsuccsess fully !",
    });
  }
};
