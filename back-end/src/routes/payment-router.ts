import { Router } from "express";
import { getHash, notify } from "../controller/PaymentController";

const router = Router();

router.post("/notify", notify);

router.post("/getHash", getHash);

export default router;
