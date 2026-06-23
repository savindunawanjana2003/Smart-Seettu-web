// src/controller/OngoinController.ts
import { Request, Response } from "express";
import gruoModel from "../models/group-modal";

// Define enum if not in types
enum Grupstete {
  PENDING = "pending",
  ACTIVE = "active",
  COMPLETED = "completed",
}

export class OngoinController {
  // ==================== GROUP MANAGEMENT ====================

  getAllGroups = async (req: Request, res: Response): Promise<void> => {
    try {
      const groups = await gruoModel.find();
      res.status(200).json(groups);
    } catch (error) {
      console.error("Error fetching groups:", error);
      res.status(500).json({
        message: "Error fetching groups",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  getGroupById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { groupId } = req.params;
      const group = await gruoModel.findOne({ id: groupId });

      if (!group) {
        res.status(404).json({ message: "Group not found" });
        return;
      }

      res.status(200).json(group);
    } catch (error) {
      console.error("Error fetching group:", error);
      res.status(500).json({
        message: "Error fetching group",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  createGroup = async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        adminid,
        expectedMonthlySeettuAmount,
        monthlyContributionPerMember,
        seettuDurationInMonths,
        members = [],
      } = req.body;

      if (!adminid) {
        res.status(400).json({ message: "Admin ID is required" });
        return;
      }

      if (!expectedMonthlySeettuAmount) {
        res
          .status(400)
          .json({ message: "Expected monthly seettu amount is required" });
        return;
      }

      if (!monthlyContributionPerMember) {
        res
          .status(400)
          .json({ message: "Monthly contribution per member is required" });
        return;
      }

      if (!seettuDurationInMonths) {
        res
          .status(400)
          .json({ message: "Seettu duration in months is required" });
        return;
      }

      // Generate unique group ID
      const groupId = `G${Date.now().toString().slice(-6)}`;

      const newGroup = new gruoModel({
        id: groupId,
        adminid,
        memberCount: String(members.length + 1),
        expectedMonthlySeettuAmount,
        monthlyContributionPerMember,
        seettuDurationInMonths,
        members: members,
        grupStete: Grupstete.PENDING,
        createDate: new Date().toISOString().split("T")[0],
      });

      await newGroup.save();
      res.status(201).json(newGroup);
    } catch (error) {
      console.error("Error creating group:", error);
      res.status(400).json({
        message: "Error creating group",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  updateGroup = async (req: Request, res: Response): Promise<void> => {
    try {
      const { groupId } = req.params;
      const updateData = req.body;

      const updatedGroup = await gruoModel.findOneAndUpdate(
        { id: groupId },
        updateData,
        { new: true, runValidators: true },
      );

      if (!updatedGroup) {
        res.status(404).json({ message: "Group not found" });
        return;
      }

      res.status(200).json(updatedGroup);
    } catch (error) {
      console.error("Error updating group:", error);
      res.status(400).json({
        message: "Error updating group",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  deleteGroup = async (req: Request, res: Response): Promise<void> => {
    try {
      const { groupId } = req.params;

      const deletedGroup = await gruoModel.findOneAndDelete({ id: groupId });

      if (!deletedGroup) {
        res.status(404).json({ message: "Group not found" });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Group deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting group:", error);
      res.status(500).json({
        message: "Error deleting group",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  // ==================== MEMBER MANAGEMENT ====================

  joinGroup = async (req: Request, res: Response): Promise<void> => {
    try {
      const { groupId } = req.params;
      const { memberId, membername, contactnumber, tagname } = req.body;

      if (!memberId || !membername) {
        res.status(400).json({ message: "Member ID and name are required" });
        return;
      }

      const group: any = await gruoModel.findOne({ id: groupId });
      if (!group) {
        res.status(404).json({ message: "Group not found" });
        return;
      }

      // Check if member already exists
      const existingMember = group.members.find(
        (m: any) => m.memberId === memberId,
      );
      if (existingMember) {
        res.status(400).json({ message: "Already a member of this group" });
        return;
      }

      // Check if group is full (max 12 members)
      if (group.members.length >= 12) {
        res
          .status(400)
          .json({ message: "Group is full. Maximum 12 members allowed." });
        return;
      }

      // Add member
      group.members.push({
        memberId,
        membername,
        contactnumber: contactnumber || "",
        tagname: tagname || "",
      });
      group.memberCount = String(group.members.length);

      await group.save();

      res.status(200).json({
        success: true,
        message: "Successfully joined the group",
        data: group,
      });
    } catch (error) {
      console.error("Error joining group:", error);
      res.status(500).json({
        message: "Error joining group",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  leaveGroup = async (req: Request, res: Response): Promise<void> => {
    try {
      const { groupId } = req.params;
      const { memberId } = req.body;

      if (!memberId) {
        res.status(400).json({ message: "Member ID is required" });
        return;
      }

      const group: any = await gruoModel.findOne({ id: groupId });
      if (!group) {
        res.status(404).json({ message: "Group not found" });
        return;
      }

      // Check if member exists
      const memberIndex = group.members.findIndex(
        (m: any) => m.memberId === memberId,
      );
      if (memberIndex === -1) {
        res.status(400).json({ message: "Not a member of this group" });
        return;
      }

      // Check if member is admin
      if (group.adminid === memberId) {
        res.status(400).json({
          message:
            "Admin cannot leave the group. Please delete the group or transfer admin rights.",
        });
        return;
      }

      // Remove member
      group.members.splice(memberIndex, 1);
      group.memberCount = String(group.members.length);

      await group.save();

      res.status(200).json({
        success: true,
        message: "Successfully left the group",
        data: group,
      });
    } catch (error) {
      console.error("Error leaving group:", error);
      res.status(500).json({
        message: "Error leaving group",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  getGroupMembers = async (req: Request, res: Response): Promise<void> => {
    try {
      const { groupId } = req.params;

      const group: any = await gruoModel.findOne({ id: groupId });
      if (!group) {
        res.status(404).json({ message: "Group not found" });
        return;
      }

      res.status(200).json({
        success: true,
        data: {
          adminId: group.adminid,
          members: group.members,
          totalMembers: group.members.length,
          maxMembers: 12,
        },
      });
    } catch (error) {
      console.error("Error fetching members:", error);
      res.status(500).json({
        message: "Error fetching members",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  removeMember = async (req: Request, res: Response): Promise<void> => {
    try {
      const { groupId, memberId } = req.params;

      const group: any = await gruoModel.findOne({ id: groupId });
      if (!group) {
        res.status(404).json({ message: "Group not found" });
        return;
      }

      const memberIndex = group.members.findIndex(
        (m: any) => m.memberId === memberId,
      );
      if (memberIndex === -1) {
        res.status(400).json({ message: "Member not found in this group" });
        return;
      }

      // Check if trying to remove admin
      if (group.adminid === memberId) {
        res.status(400).json({ message: "Cannot remove admin from the group" });
        return;
      }

      // Remove member
      group.members.splice(memberIndex, 1);
      group.memberCount = String(group.members.length);
      await group.save();

      res.status(200).json({
        success: true,
        message: "Member removed successfully",
        data: group,
      });
    } catch (error) {
      console.error("Error removing member:", error);
      res.status(500).json({
        message: "Error removing member",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  // ==================== STATUS MANAGEMENT ====================

  updateGroupStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const { groupId } = req.params;
      const { status } = req.body;

      if (!status || !Object.values(Grupstete).includes(status)) {
        res.status(400).json({
          message: "Invalid status. Must be PENDING, ACTIVE, or COMPLETED",
        });
        return;
      }

      const updatedGroup = await gruoModel.findOneAndUpdate(
        { id: groupId },
        { grupStete: status },
        { new: true },
      );

      if (!updatedGroup) {
        res.status(404).json({ message: "Group not found" });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Group status updated successfully",
        data: updatedGroup,
      });
    } catch (error) {
      console.error("Error updating group status:", error);
      res.status(500).json({
        message: "Error updating group status",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  // ==================== USER SPECIFIC ====================

  getUserGroups = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;

      if (!userId) {
        res.status(400).json({ message: "User ID is required" });
        return;
      }

      // Find groups where user is admin
      const adminGroups = await gruoModel.find({ adminid: userId });

      // Find groups where user is a member
      const memberGroups = await gruoModel.find({
        "members.memberId": userId,
      });

      // Combine and remove duplicates
      const allGroups = [...adminGroups, ...memberGroups];
      const uniqueGroups = allGroups.filter(
        (group, index, self) =>
          index === self.findIndex((g) => g.id === group.id),
      );

      // Format response for UI
      const formattedGroups = uniqueGroups.map((group: any) => ({
        id: group.id,
        name: `සීට්ටු සමූහය ${group.id}`,
        description: `මාසික සීට්ටු සමූහය - ${group.createDate}`,
        memberCount: group.members.length,
        maxMembers: 12,
        createdDate: group.createDate,
        status: group.grupStete,
        isAdmin: group.adminid === userId,
        isMember: group.members.some((m: any) => m.memberId === userId),
        lastActivity: group.createDate,
        expectedMonthlySeettuAmount: group.expectedMonthlySeettuAmount,
        monthlyContributionPerMember: group.monthlyContributionPerMember,
        seettuDurationInMonths: group.seettuDurationInMonths,
      }));

      res.status(200).json({
        success: true,
        data: formattedGroups,
        total: formattedGroups.length,
      });
    } catch (error) {
      console.error("Error fetching user groups:", error);
      res.status(500).json({
        message: "Error fetching user groups",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  getUserActivity = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;

      if (!userId) {
        res.status(400).json({ message: "User ID is required" });
        return;
      }

      const adminGroups = await gruoModel.find({ adminid: userId });
      const memberGroups = await gruoModel.find({
        "members.memberId": userId,
      });

      // Combine and remove duplicates
      const allGroups = [...adminGroups, ...memberGroups];
      const uniqueGroups: any = allGroups.filter(
        (group, index, self) =>
          index === self.findIndex((g) => g.id === group.id),
      );

      const totalGroupsJoined = uniqueGroups.length;
      const totalGroupsAdmin = adminGroups.length;
      const activeGroups = uniqueGroups.filter(
        (g: any) => g.grupStete === Grupstete.ACTIVE,
      ).length;

      // Calculate total contributions
      let totalContributions = 0;
      for (const group of uniqueGroups) {
        totalContributions +=
          Number(group.expectedMonthlySeettuAmount) / group.members.length;
      }

      res.status(200).json({
        success: true,
        data: {
          totalGroupsJoined,
          totalGroupsAdmin,
          totalContributions: totalContributions.toFixed(2),
          activeGroups,
        },
      });
    } catch (error) {
      console.error("Error fetching user activity:", error);
      res.status(500).json({
        message: "Error fetching user activity",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  // ==================== STATISTICS ====================

  getGroupStats = async (req: Request, res: Response): Promise<void> => {
    try {
      const { groupId } = req.params;

      const group: any = await gruoModel.findOne({ id: groupId });
      if (!group) {
        res.status(404).json({ message: "Group not found" });
        return;
      }

      const totalMembers = group.members.length;
      const totalContributions =
        Number(group.expectedMonthlySeettuAmount) * totalMembers;
      const remainingAmount =
        totalContributions -
        Number(group.monthlyContributionPerMember) * totalMembers;

      // Calculate completion rate
      const totalMonths = Number(group.seettuDurationInMonths);
      const elapsedMonths =
        new Date().getMonth() -
        new Date(group.createDate).getMonth() +
        12 *
          (new Date().getFullYear() - new Date(group.createDate).getFullYear());
      const completionRate = Math.min((elapsedMonths / totalMonths) * 100, 100);

      // Calculate next payment date (add 1 month to creation date)
      const nextPaymentDate = new Date(group.createDate);
      nextPaymentDate.setMonth(nextPaymentDate.getMonth() + elapsedMonths + 1);

      res.status(200).json({
        success: true,
        data: {
          totalMembers,
          totalContributions: totalContributions.toFixed(2),
          remainingAmount: remainingAmount.toFixed(2),
          nextPaymentDate: nextPaymentDate.toISOString().split("T")[0],
          completionRate: Math.round(completionRate),
        },
      });
    } catch (error) {
      console.error("Error fetching group stats:", error);
      res.status(500).json({
        message: "Error fetching group statistics",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  searchGroups = async (req: Request, res: Response): Promise<void> => {
    try {
      const { q } = req.query;

      if (!q || typeof q !== "string") {
        res.status(400).json({ message: "Search query is required" });
        return;
      }

      // Search by ID or member name
      const groups = await gruoModel.find({
        $or: [
          { id: { $regex: q, $options: "i" } },
          { "members.membername": { $regex: q, $options: "i" } },
        ],
      });

      const formattedGroups = groups.map((group: any) => ({
        id: group.id,
        name: `සීට්ටු සමූහය ${group.id}`,
        description: `මාසික සීට්ටු සමූහය - ${group.createDate}`,
        memberCount: group.members.length,
        maxMembers: 12,
        createdDate: group.createDate,
        status: group.grupStete,
        adminId: group.adminid,
      }));

      res.status(200).json({
        success: true,
        data: formattedGroups,
        total: formattedGroups.length,
      });
    } catch (error) {
      console.error("Error searching groups:", error);
      res.status(500).json({
        message: "Error searching groups",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };
}
