import express from "express";
import {
  createNewRequest,
  getPendingRequestsByMemberEmail,
  getRequestByGroupAndMember,
} from "../controller/ReqestController";

const router = express.Router();

router.post("/saverequest", createNewRequest);

router.get("/getdetails", getRequestByGroupAndMember);

router.get("/getpendingrequests", getPendingRequestsByMemberEmail);

export default router;
