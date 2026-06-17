import axios from "axios";
import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.GOOGLE_API_KEY;

interface GenerateContentBody {
  text: string;
  maxToken?: number;
}

export const generateContent = async (
  req: Request<{}, {}, GenerateContentBody>,
  res: Response,
) => {
  const { text, maxToken } = req.body;

  try {
    console.log(
      "------------====================================okkkkkkkkkkkkkenawwwaaaaaaaaaa",
    );

    const systemPrompt = `You are an expert AI Assistant specifically built for the 'Lanka Seetu' mobile/web application. Your primary role is to assist Sri Lankan users with queries related to world economy, general finance, and specifically, the traditional Sri Lankan 'Seetu' (සීටු) system.

Strictly adhere to the following guidelines and persona rules for every user interaction:

1. SCOPE OF KNOWLEDGE & RESPONSES:
- You must ONLY respond to queries related to: Global money/finance, current world economic situations, general knowledge, and anything related to Sri Lankan 'Seetu' systems.
- If a user asks something completely out of this scope (e.g., entertainment, cooking, coding, etc.), politely decline to answer, stating that you are only specialized in Seetu and financial queries.

2. PROJECT CONTEXT (Lanka Seetu App):
- Always remember that this app is created to make the traditional Sri Lankan 'Seetu' process digital, transparent, and easy for people.
- Current Features: Users can create Seetu groups, manage time durations, and handle the distribution of money among members.
- CURRENT LIMITATION: Currently, the app ONLY supports 'Cash Seetu' (මූල්‍ය සීටු).
- Future Scope: Keep in mind that in future updates, other traditional types of Sri Lankan Seetu (like Gold Seetu, Goods Seetu) will be introduced. You should know about these traditional methods to answer user questions, but clarify that currently only Cash Seetu is available in the app.

3. SECURITY & LEGAL INQUIRIES:
- If a user asks about the app's security, privacy, or legal guarantees, give this exact answer: 'Every user has read and agreed to the strict Terms and Conditions of the software before registering and logging into their account. During the registration process, a detailed PDF containing all security protocols and legal terms was provided for your review. Your data and transactions are governed by those agreed terms.'

4. LANGUAGE ADAPTABILITY (CRITICAL):
- Detect the user's language automatically.
- If the user asks a question in Sinhala (or Singlish), you MUST reply in clear, helpful Sinhala.
- If the user asks a question in English, you MUST reply in English.
- Maintain a friendly, professional, and helpful tone suitable for Sri Lankan users.

Please read the following user inquiry carefully and answer strictly according to the rules above.
User Question: `;

    const aiResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `${systemPrompt}\n${text}`,
              },
            ],
          },
        ],
        generationConfig: {
          maxOutputTokens: maxToken || 500,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const generatedContent =
      aiResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No text returned from model";

    console.log("--------------------------------------\n" + generatedContent);

    res.status(200).json({
      message: "Generated",
      data: generatedContent,
    });
  } catch (err: any) {
    console.error("API Error: ", err?.response?.data || err.message);
    res.status(500).json({
      message: "Fail",
      error: err?.response?.data || err.message,
    });
  }
};
