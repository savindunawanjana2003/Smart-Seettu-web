import { Router } from "express";
import { format } from "node:path";

import { registerCustomer } from "../controller/customerController";

const router = Router();

router.post("/save", registerCustomer);

export default router;
