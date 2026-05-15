import { Router } from "express";
import { format } from "node:path";

import { saveCustomer } from "../controller/customerController";

const router = Router();

router.post("/save", saveCustomer);

export default router;
