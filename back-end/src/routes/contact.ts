import { Router } from "express";
import { getAllCustomers, addCustomer } from "../controller/ContactController";

const router = Router();

router.get("/getAllCustomers", getAllCustomers);
router.post("/addCustomer", addCustomer);

export default router;
