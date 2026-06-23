// src/routes/ongoinRouter.ts
import { Router } from "express";
import { OngoinController } from "../controller/OngoinController";

const router = Router();
const ongoinController = new OngoinController();

router.get("/all", ongoinController.getAllGroups);

router.get("/group/:groupId", ongoinController.getGroupById);

router.post("/create", ongoinController.createGroup);

router.put("/update/:groupId", ongoinController.updateGroup);

router.delete("/delete/:groupId", ongoinController.deleteGroup);

router.post("/join/:groupId", ongoinController.joinGroup);

router.post("/leave/:groupId", ongoinController.leaveGroup);

router.get("/members/:groupId", ongoinController.getGroupMembers);

router.delete("/member/:groupId/:memberId", ongoinController.removeMember);

router.patch("/status/:groupId", ongoinController.updateGroupStatus);

router.get("/user/:userId/groups", ongoinController.getUserGroups);

router.get("/user/:userId/activity", ongoinController.getUserActivity);

router.get("/stats/:groupId", ongoinController.getGroupStats);

router.get("/search", ongoinController.searchGroups);

export default router;
