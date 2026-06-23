import { Router } from "express";
import { format } from "node:path";

import {
  getAllCustomers,
  getAllOnlineMembers,
  registerCustomer,
  updateCustomerOfflineStatus,
  // updateCustomerOnlineStatus,
} from "../controller/customerController";
import { authenticate } from "../middlewares/auth";

const router = Router();

router.post("/save", authenticate, registerCustomer);

// router.put("/setonline", authenticate, updateCustomerOnlineStatus);

router.put("/setOffline", authenticate, updateCustomerOfflineStatus);
router.get("/getcustomer", authenticate, getAllCustomers);
router.get("/getOnlinemembers", getAllOnlineMembers);

export default router;
