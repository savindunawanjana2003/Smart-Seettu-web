import { Router } from "express";
import { format } from "node:path";

import { savegroup } from "../controller/grupController";

const router = Router();

router.post("/save", savegroup);

export default router;
