// src/services/ongoinService.ts
import api from "./api";

export interface GroupData {
  id?: string;
  adminid: string;
  memberCount?: string;
  expectedMonthlySeettuAmount: string;
  monthlyContributionPerMember: string;
  seettuDurationInMonths: string;
  members?: any[];
  grupStete?: "pending" | "active" | "completed";
  createDate?: string;
}

export const ongoinService = {
  // Get all groups
  getAllGroups: async () => {
    try {
      const { data } = await api.get("/ongoin/all");
      return data;
    } catch (error) {
      console.error("Error fetching groups:", error);
      throw error;
    }
  },

  getGroupById: async (groupId: string) => {
    try {
      const { data } = await api.get(`/ongoin/group/${groupId}`);
      return data;
    } catch (error) {
      console.error("Error fetching group:", error);
      throw error;
    }
  },
};
