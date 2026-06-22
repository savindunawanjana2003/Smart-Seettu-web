import { Request, Response } from "express";
import RequestModel from "../models/reqest-model";
import mongoose from "mongoose";
import groupModel from "../models/group-modal";
import customerModal from "../models/customer-modal";

const getNextRequestId = async (): Promise<string> => {
  try {
    const lastRequest = await RequestModel.findOne().sort({ reqestId: -1 });

    if (!lastRequest) {
      return "R-001";
    }

    const lastIdNumber = parseInt(lastRequest.reqestId.replace("R-", ""), 10);
    const nextIdNumber = lastIdNumber + 1;

    return `R-${String(nextIdNumber).padStart(3, "0")}`;
  } catch (error) {
    console.error("Error generating Request ID:", error);
    throw new Error("Failed to generate Request ID");
  }
};

export const createNewRequest = async (req: Request, res: Response) => {
  try {
    const { grupId, grupAdminId, memberEmail, memberRespons } = req.body;

    if (!grupId || !grupAdminId || !memberEmail || !memberRespons) {
      return res
        .status(400)
        .json({ message: "කරුණාකර සියලුම විස්තර ඇතුළත් කරන්න." });
    }

    const nextRequestId = await getNextRequestId();

    const currentDateTime = new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    const newRequest = new RequestModel({
      reqestId: nextRequestId,
      grupId,
      grupAdminId,
      memberEmail,
      memberRespons,
      createDateTime: currentDateTime,
    });

    const savedRequest = await newRequest.save();

    return res.status(201).json({
      message: "Request Created Successfully ",
      data: savedRequest,
    });
  } catch (error: any) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

export const getRequestByGroupAndMember = async (
  req: Request,
  res: Response,
) => {
  try {
    const { grupId, memberEmail } = req.query;
    if (!grupId || !memberEmail) {
      return res.status(400).json({
        message: "grupId සහ memberEmail යන දෙකම ලබා දීම අනිවාර්ය වේ.",
      });
    }

    const requestDetails = await RequestModel.findOne({
      grupId: grupId as string,
      memberEmail: memberEmail as string,
    });

    if (!requestDetails) {
      return res
        .status(404)
        .json({ message: "එම විස්තර වලට අදාළ Request එකක් හමු නොවිණි." });
    }

    return res.status(200).json({
      message: "Data fetched successfully ",
      data: requestDetails,
    });
  } catch (error: any) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

export const getPendingRequestsByMemberEmail = async (
  req: Request,
  res: Response,
) => {
  try {
    const { memberEmail } = req.query;

    if (!memberEmail) {
      return res.status(400).json({
        message: "memberEmail is required",
      });
    }

    const requests = await RequestModel.find({
      memberEmail: memberEmail as string,
      memberRespons: "pending",
    });

    if (requests.length === 0) {
      return res.status(404).json({
        message: "No pending requests found",
      });
    }

    return res.status(200).json({
      message: "Pending requests fetched successfully",
      count: requests.length,
      data: requests,
    });
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// export const getPendingRequestsByMemberEmail = async (
//   req: Request,
//   res: Response,
// ) => {
//   try {
//     const { memberEmail } = req.body;

//     console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\");
//     console.log(memberEmail);

//     const requests = await RequestModel.find({ memberEmail });
//     if (!requests || requests.length == 0) {
//       return { message: "ඔබට කිසිදු සීට්ටු ආරාධනාවක් (Requests) ලැබී නැත." };
//     }
//     return res.status(200).json({
//       message: "Data fetched successfully ",
//       data: requests,
//     });
//   } catch (err) {
//     console.error("Database Error (getUserSeetuRequests):", err);
//     return { error: "Requests සෙවීමේදී ගැටලුවක් ඇතිවිය." };
//   }
// };

export const tartSessionForGrupReqest = async (req: Request, res: Response) => {
  // 1. Session created with mongose
  const session = await mongoose.startSession();

  try {
    // start the trans section
    session.startTransaction();
    const { grupId, memberEmail, memberRespons, reqestId } = req.body;

    const customer = await customerModal.findOne({ email: memberEmail });
    console.log("====custormer ==> " + customer);
    if (!customer) {
      res.status(500).json({ Message: "Customer not found!" });
      return;
    }

    const group = await groupModel.findOne({ id: grupId });

    if (!group) {
      res.status(500).json({ Message: "Seettu Group not found!" });
      return;
    }

    let nextMemberId = "M-001";
    if (group.members && group.members.length > 0) {
      const lastMember = group.members[group.members.length - 1];
      const lastMemberIdNum = parseInt(lastMember.memberId.split("-")[1]);
      const nextMemberIdNum = lastMemberIdNum + 1;
      nextMemberId = `M-${String(nextMemberIdNum).padStart(3, "0")}`;
    }

    const newMember = {
      memberId: nextMemberId,
      membername: customer.name,
      contactnumber: customer.poneNumber,
      tagname: "member",
    };

    const updatedGroup = await groupModel.findOneAndUpdate(
      { id: grupId },
      { $push: { members: newMember } },
      { new: true },
    );

    const resp = await RequestModel.findOneAndUpdate(
      { reqestId: reqestId },
      { memberRespons: memberRespons },
      { new: true },
    );

    await session.commitTransaction();

    const io = req.app.get("io");
    if (io) {
      io.emit("backend-updated", {
        message: "New member added to the group ",
        type: "NEW_MEMBER_ADD_TO_THE_GRUP",
      });
    }

    res.status(201).json({
      success: true,
      Message: "Member added successfully!",
      nextMemberId: nextMemberId,
      data: updatedGroup,
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ success: false, error });
  } finally {
    session.endSession();
  }
};
