import { Router } from "express";
// import { format } from "node:path";
import { authenticate } from "../middlewares/auth";
import {
  getAllGrupmembersWholeGrup,
  savegroup,
  getNextmemberIdBygrupId,
  getNextGrupId,
  getAllGroups,
} from "../controller/grupController";

const router = Router();

router.route("/save").post(authenticate, savegroup);

router.get(
  "/getNextmemberIdbyGrupId/:groupId",
  authenticate,
  getNextmemberIdBygrupId,
);

// ==========
router.get("/getNextGrupId", authenticate, getNextGrupId);

router.get(
  "/getAllGrupmembersWholeGrup/:groupId",
  authenticate,
  getAllGrupmembersWholeGrup,
);

router.get("/getAllGroups", getAllGroups);

export default router;

// /grup/getAllGroups
