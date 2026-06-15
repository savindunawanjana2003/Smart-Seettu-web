import { Request, Response } from "express";
import RequestModel from "../models/reqest-model"; // ඔයාගේ Model එක තියෙන තැන නිවැරදිව දාන්න

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
      message: "Request Created Successfully ✅",
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
      message: "Data fetched successfully 🎯",
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
