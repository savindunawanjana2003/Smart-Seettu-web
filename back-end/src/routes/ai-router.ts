import { Router } from "express";
import { generateContent } from "../controller/AiController";
const router = Router();
router.route("/tockWithAi").post(generateContent);
export default router;
