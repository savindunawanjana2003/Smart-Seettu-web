import { Router } from "express";
import { format } from "node:path";

import {
  registerCustomer,
  updateCustomerOnlineStatus,
} from "../controller/customerController";

const router = Router();

router.post("/save", registerCustomer);

router.put("/online", updateCustomerOnlineStatus);

export default router;
