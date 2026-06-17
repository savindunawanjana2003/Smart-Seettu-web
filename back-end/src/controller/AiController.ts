import axios from "axios";
import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.GOOGLE_API_KEY;

interface GenerateContentBody {
  text: string;
  maxToken?: number; // optional නම් ? ලකුණ දාන්න
}

export const generateContent = async (
  req: Request<{}, {}, GenerateContentBody>,
  res: Response,
) => {
  const { text, maxToken } = req.body;
  try {
    const aiResponse = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent",
      {
        contents: [
          {
            parts: [{ text: text }],
            // parts: [{ text: "What is " + text }]
          },
        ],
        generationConfig: {
          maxOutputTokens: maxToken || 150,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": API_KEY,
        },
      },
    );

    console.log(aiResponse);

    const generatedContent =
      aiResponse.data?.candidates?.[0]?.content?.[0]?.text ||
      aiResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No data";

    // const generatedContent =
    //   aiResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    //   "No text returned from model"

    console.log("--------------------------------------");
    // console.log(aiResponse.data?.candidates)

    res.status(200).json({
      message: "Generated",
      data: generatedContent,
      ai: aiResponse?.data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Fail", error: err });
  }
};
