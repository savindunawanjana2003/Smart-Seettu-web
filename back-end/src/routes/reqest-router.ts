import express from "express";
import {
  createNewRequest,
  getPendingRequestsByMemberEmail,
  getRequestByGroupAndMember,
  tartSessionForGrupReqest,
} from "../controller/ReqestController";

const router = express.Router();

router.post("/saverequest", createNewRequest);

router.get("/getdetails", getRequestByGroupAndMember);

router.get("/getpendingrequests", getPendingRequestsByMemberEmail);
// reactionForGrupReqest

router.post("/reactionForGrupReqest", tartSessionForGrupReqest);

export default router;
