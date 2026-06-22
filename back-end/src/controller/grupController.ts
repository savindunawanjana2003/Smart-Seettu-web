import { Request, Response } from "express";
import groupModel from "../models/group-modal";

export const savegroup = async (req: Request, res: Response) => {
  const {
    adminid,
    memberCount,
    expectedMonthlySeettuAmount,
    monthlyContributionPerMember,
    seettuDurationInMonths,
    members,
  } = req.body;
  try {
    const dateOnly = new Date().toDateString();

    const allGroups = await groupModel.find({}, { id: 1 });

    let maxIdNumber = 0;

    allGroups.forEach((group) => {
      if (group.id) {
        const num = parseInt(group.id.split("-")[1]);

        if (num > maxIdNumber) {
          maxIdNumber = num;
        }
      }
    });
    const nextId = `GRP-${String(maxIdNumber + 1).padStart(3, "0")}`;
    // console.log("======================= 00077 " + nextId);
    // ---------------------

    const group = new groupModel({
      id: nextId,
      adminid: adminid,
      memberCount: memberCount,
      expectedMonthlySeettuAmount,
      monthlyContributionPerMember,
      seettuDurationInMonths,
      members,
      createDate: dateOnly,
    });
    const sgroup = await group.save();
    res.status(201).json({
      Message: "Save succsess fully !",
      data: sgroup,
    });
    console.log("++++++++++++++++++ emite START +++++++++++++++++++++++++++++");
    const io = req.app.get("io");
    if (io) {
      io.emit("backend-updated", {
        message: "A new grup was Loged! Please refresh.",
        type: "NEW_GRUP_ADD",
      });
      console.log("Broadcasting Success!");
    }
    console.log("++++++++++++++++++ emite END +++++++++++++++++++++++++++++");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      Message: " Group Save Unsuccsess fully !",
    });
  }
};

export const getNextmemberIdBygrupId = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params;

    const group = await groupModel.findOne({ id: groupId });

    if (!group) {
      res.status(404).json({ Message: "Group not found" });
      return;
    }

    let nextMemberId = "M-001";

    if (group.members && group.members.length > 0) {
      const lastMember = group.members[group.members.length - 1];
      const lastMemberIdNum = parseInt(lastMember.memberId.split("-")[1]);
      const nextMemberIdNum = lastMemberIdNum + 1;
      nextMemberId = `M-${String(nextMemberIdNum).padStart(3, "0")}`;
    }

    res.status(200).json({ nextMemberId: nextMemberId });
  } catch (error: any) {
    res.status(500).json({
      Message: "Error generating next Member ID",
      Error: error.message,
    });
  }
};

export const getNextGrupId = async (req: Request, res: Response) => {
  try {
    const allGroups = await groupModel.find({}, { id: 1 });

    let maxIdNumber = 0;

    allGroups.forEach((group) => {
      if (group.id) {
        const num = parseInt(group.id.split("-")[1]);

        if (num > maxIdNumber) {
          maxIdNumber = num;
        }
      }
    });

    const nextId = `GRP-${String(maxIdNumber + 1).padStart(3, "0")}`;

    res.status(200).json({
      nextGroupId: nextId,
    });
  } catch (error: any) {
    res.status(500).json({
      Message: "Error generating next Group ID",
      Error: error.message,
    });
  }
};

export const getAllGrupmembersWholeGrup = async (
  req: Request,
  res: Response,
) => {
  try {
    const { groupId } = req.params;
    console.log(groupId + "+========================================");

    const group = await groupModel.findOne({ id: groupId });

    if (!group) {
      res.status(404).json({ Message: "Seettu Group not found!" });
      return;
    }
    const allMembers = group.members || [];

    res.status(200).json({
      Message: "Members fetched successfully!",
      count: allMembers.length,
      memberslist: allMembers,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      Message: "Error fetching group members!",
      Error: error.message,
    });
  }
};

export const getAllGroups = async (req: Request, res: Response) => {
  try {
    const groups = await groupModel.find();

    res.status(200).json({
      message: "Groups fetched successfully!",
      count: groups.length,
      data: groups,
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      message: "Error fetching groups!",
      error: error.message,
    });
  }
};
