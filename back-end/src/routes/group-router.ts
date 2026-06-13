import { Router } from "express";
// import { format } from "node:path";
import { authenticate } from "../middlewares/auth";
import {
  getAllGrupmembersWholeGrup,
  savegroup,
  getNextmemberIdBygrupId,
  getNextGrupId,
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

export default router;
