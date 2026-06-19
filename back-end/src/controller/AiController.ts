import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

import CustormerModel from "../models/customer-modal";
import gruoModel from "../models/group-modal";
import RequestModel from "../models/reqest-model";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

const getAllOnlineMembers = async (): Promise<number> => {
  console.log(" getAllOnlineMembers function hit!");
  try {
    const count = await CustormerModel.countDocuments({ isOnline: true });
    return count;
  } catch (err) {
    console.error("Database Error (getAllOnlineMembers):", err);
    return 0;
  }
};

const getSeetuGroupDetails = async (groupId: string) => {
  console.log(` getSeetuGroupDetails function hit for ID: ${groupId}`);
  try {
    const group = await gruoModel.findOne({ id: groupId });
    if (!group) return { error: "සීට්ටු ගෲප් එකක් හමුනොවීය." };

    const members: any = group?.members || [];
    return {
      groupId: group.id,
      adminId: group.adminid,
      memberCount: group.memberCount,
      expectedMonthlyTotal: group.expectedMonthlySeettuAmount,
      monthlyContributionPerMember: group.monthlyContributionPerMember,
      durationInMonths: group.seettuDurationInMonths,
      status: group.grupStete,
      createdDate: group.createDate,
      membersList: members.map((m: any) => ({
        name: m.membername,
        tag: m.tagname,
        contact: m.contactnumber,
      })),
    };
  } catch (err) {
    console.error("Database Error (getSeetuGroupDetails):", err);
    return { error: "දත්ත ලබා ගැනීමේදී ගැටලුවක් ඇතිවිය." };
  }
};

const getUserSeetuRequests = async (email: string) => {
  console.log(` getUserSeetuRequests function hit for Email: ${email}`);
  try {
    const requests = await RequestModel.find({ memberEmail: email });
    if (!requests || requests.length === 0) {
      return { message: "ඔබට කිසිදු සීට්ටු ආරාධනාවක් (Requests) ලැබී නැත." };
    }
    return requests.map((req) => ({
      requestId: req.reqestId,
      groupId: req.grupId,
      adminId: req.grupAdminId,
      yourResponse: req.memberRespons,
      receivedDateTime: req.createDateTime,
    }));
  } catch (err) {
    console.error("Database Error (getUserSeetuRequests):", err);
    return { error: "Requests සෙවීමේදී ගැටලුවක් ඇතිවිය." };
  }
};

const getCustomerProfileSummary = async (searchKey: string) => {
  console.log(`getCustomerProfileSummary function hit for: ${searchKey}`);
  try {
    const customer = await CustormerModel.findOne({
      $or: [{ email: searchKey }, { nic: searchKey }],
    }).select("-password -otp -resetPasswrod");

    if (!customer)
      return {
        error: "එම විද්‍යුත් තැපෑලෙන් හෝ NIC අංකයෙන් පාරිභෝගිකයෙකු හමුනොවීය.",
      };

    return {
      name: customer.name,
      email: customer.email,
      nic: customer.nic,
      phoneNumber: customer.poneNumber,
      address: customer.address,
      isOnline: customer.isOnline ? "Online" : "Offline",
      joinedAt: (customer as any).createdAt,
    };
  } catch (err) {
    console.error("Database Error (getCustomerProfileSummary):", err);
    return { error: "පාරිභෝගික විස්තර සෙවීමේදී ගැටලුවක් ඇතිවිය." };
  }
};

const getGroupsByAdmin = async (adminId: string) => {
  console.log(` getGroupsByAdmin function hit for Admin: ${adminId}`);
  try {
    const groups = await gruoModel.find({ adminid: adminId });
    if (!groups || groups.length === 0)
      return { message: "මෙම Admin යටතේ කිසිදු ගෲප් එකක් හමුනොවීය." };

    return groups.map((g) => ({
      groupId: g.id,
      memberCount: g.memberCount,
      status: g.grupStete,
      monthlyAmount: g.expectedMonthlySeettuAmount,
    }));
  } catch (err) {
    console.error("Database Error (getGroupsByAdmin):", err);
    return { error: "ගෲප් ලැයිස්තුව ලබාගැනීමේදී ගැටලුවක් ඇතිවිය." };
  }
};

const getGroupsByState = async (state: string) => {
  console.log(`getGroupsByState function hit for State: ${state}`);
  try {
    const groups = await gruoModel.find({ grupStete: state.toUpperCase() });
    if (!groups || groups.length === 0)
      return { message: `'${state}' තත්ත්වයේ පවතින ගෲප් කිසිවක් නැත.` };

    return groups.map((g) => ({
      groupId: g.id,
      adminId: g.adminid,
      memberCount: g.memberCount,
      createdDate: g.createDate,
    }));
  } catch (err) {
    console.error("Database Error (getGroupsByState):", err);
    return { error: "තත්ත්වයන් අනුව ගෲප් සෙවීමේදී ගැටලුවක් ඇතිවිය." };
  }
};

const SYSTEM_INSTRUCTION = `You are 'Smart Seetu AI Agent', an expert financial assistant built for the 'Lanka Seetu' platform.

Strictly follow these persona guidelines:
1. SCOPE: Answer queries about global/local finance, economy, and the Sri Lankan traditional/digital Seetu system. Politely reject other topics.
2. CONTEXT: The app currently supports ONLY 'Cash Seetu' (මූල්‍ය සීටු). Traditional variants like Gold/Goods Seetu will be added in future updates.
3. SECURITY/PRIVACY: You cannot modify, insert, delete, or update any database record. You can only view summaries. Never attempt or offer to disclose passwords, credentials, tokens, or OTP codes. If a user asks for credentials or passwords, respond that 'For security reasons, user credentials and passwords are encrypted and cannot be accessed or displayed.'
4. LANGUAGE: Auto-detect language. If user writes in Sinhala/Singlish, reply in helpful Sinhala. If in English, reply in English.

TOOL USAGE RULES:
- To see how many people are online: Use 'getAllOnlineMembers'.
- To check specific Seetu group details/members: Extract 'groupId' and use 'getSeetuGroupDetails'.
- To check invitations/requests for a member: Extract 'email' and use 'getUserSeetuRequests'.
- To search for a user profile info (safe fields): Extract email or nic as 'searchKey' and use 'getCustomerProfileSummary'.
- To find all groups created by an admin: Extract 'adminId' and use 'getGroupsByAdmin'.
- To find groups by status (e.g., PENDING, STARTED): Extract 'state' and use 'getGroupsByState'.`;

const TOOLS_CONFIG = [
  {
    functionDeclarations: [
      {
        name: "getAllOnlineMembers",
        description:
          "Fetches the count of all currently online/active users in the system.",
        parameters: { type: "OBJECT", properties: {} as Record<string, any> },
      },
      {
        name: "getSeetuGroupDetails",
        description:
          "Fetches details of a specific Seetu group using the Group ID.",
        parameters: {
          type: "OBJECT",
          properties: {
            groupId: {
              type: "STRING",
              description: "The unique ID of the Seetu group (e.g., GRP-001).",
            },
          } as Record<string, any>,
          required: ["groupId"],
        },
      },
      {
        name: "getUserSeetuRequests",
        description:
          "Fetches all pending or received Seetu group requests for a member using their email.",
        parameters: {
          type: "OBJECT",
          properties: {
            email: {
              type: "STRING",
              description: "The registered email address of the user.",
            },
          } as Record<string, any>,
          required: ["email"],
        },
      },
      {
        name: "getCustomerProfileSummary",
        description:
          "Retrieves a safe public summary of a customer profile using their email or NIC. Password and OTP are excluded.",
        parameters: {
          type: "OBJECT",
          properties: {
            searchKey: {
              type: "STRING",
              description:
                "The email address or NIC number of the customer to search.",
            },
          } as Record<string, any>,
          required: ["searchKey"],
        },
      },
      {
        name: "getGroupsByAdmin",
        description:
          "Retrieves all Seetu groups created or managed by a specific Admin user ID.",
        parameters: {
          type: "OBJECT",
          properties: {
            adminId: {
              type: "STRING",
              description: "The unique ID of the group admin/creator.",
            },
          } as Record<string, any>,
          required: ["adminId"],
        },
      },
      {
        name: "getGroupsByState",
        description:
          "Filters and displays all Seetu groups based on their operational state (e.g., PENDING, STARTED).",
        parameters: {
          type: "OBJECT",
          properties: {
            state: {
              type: "STRING",
              description:
                "The state of the group, usually PENDING or STARTED.",
            },
          } as Record<string, any>,
          required: ["state"],
        },
      },
    ],
  },
];

const executeGeminiAgent = async (
  modelName: string,
  message: string,
): Promise<string> => {
  const response = await ai.models.generateContent({
    model: modelName,
    contents: message,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      tools: TOOLS_CONFIG as any,
    },
  });

  const functionCalls = response.functionCalls;

  if (functionCalls && functionCalls.length > 0) {
    const call = functionCalls[0];
    let databaseResult: any = null;

    if (call.name === "getAllOnlineMembers") {
      databaseResult = { onlineCount: await getAllOnlineMembers() };
    } else if (call.name === "getSeetuGroupDetails") {
      const args = call.args as { groupId: string };
      databaseResult = await getSeetuGroupDetails(args.groupId);
    } else if (call.name === "getUserSeetuRequests") {
      const args = call.args as { email: string };
      databaseResult = await getUserSeetuRequests(args.email);
    } else if (call.name === "getCustomerProfileSummary") {
      const args = call.args as { searchKey: string };
      databaseResult = await getCustomerProfileSummary(args.searchKey);
    } else if (call.name === "getGroupsByAdmin") {
      const args = call.args as { adminId: string };
      databaseResult = await getGroupsByAdmin(args.adminId);
    } else if (call.name === "getGroupsByState") {
      const args = call.args as { state: string };
      databaseResult = await getGroupsByState(args.state);
    }

    if (databaseResult !== null) {
      const finalResponse = await ai.models.generateContent({
        model: modelName,
        contents: [
          { role: "user", parts: [{ text: message }] },
          {
            role: "model",
            parts: [{ functionCall: { name: call.name, args: call.args } }],
          },
          {
            role: "function",
            parts: [
              {
                functionResponse: {
                  name: call.name,
                  response: { result: databaseResult },
                },
              },
            ],
          },
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });

      return finalResponse.text || "No response text";
    }
  }

  return response.text || "No response text";
};

export const generateContent = async (
  req: ExpressRequest,
  res: ExpressResponse,
): Promise<void> => {
  try {
    const message = req.body.message || req.body.text;

    if (!message) {
      res
        .status(400)
        .json({ error: "Message or text is required in request body" });
      return;
    }

    try {
      console.log("Processing with Gemini 2.5 Flash...");
      const reply = await executeGeminiAgent("gemini-2.5-flash", message);
      res.status(200).json({ reply });
      return;
    } catch (error: any) {
      console.warn("Gemini 2.5 Flash Failed! Trying Gemini 2.5 Pro...");
      console.error("Flash Error Details:", error?.message || error);

      const reply = await executeGeminiAgent("gemini-2.5-pro", message);
      res.status(200).json({ reply });
      return;
    }
  } catch (finalError: any) {
    console.error(" Both Models Failed:", finalError);
    res.status(500).json({
      error: "Internal Server Error",
      details: finalError?.message || finalError,
    });
  }
};
