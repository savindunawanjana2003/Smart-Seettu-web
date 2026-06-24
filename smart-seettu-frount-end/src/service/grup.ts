import api from "./api";

export const createGrup = async (newGrup: any) => {
  const res = await api.post("/grup/save", newGrup);
  return res;
};

export const getAllGrupmembersWholeGrup = async (grupId: string) => {
  const res = await api.get(`/grup/getAllGrupmembersWholeGrup/${grupId}`);
  return res.data;
};

export const getNextmemberidByGrupId = async (grupId: string) => {
  const res = await api.get(`/grup/getNextmemberIdbyGrupId/${grupId}`);
  return res.data;
};

export const getNextGrupId = async () => {
  const res = await api.get("/grup/getNextGrupId");
  return res.data;
};

export const getAllGroups = async () => {
  const res = await api.get("/grup/getAllGroups");
  return res.data;
};
// /grup/getAllGrupmembersFromGrupId/GRP-123  /grup/getAllGrupmembersFromGrupId/GRP-123
export const getAllGrupmembersFromGrupId = async (groupId: string) => {

  const res = await api.get(`/grup/getAllGrupmembersFromGrupId/${groupId}`);
  return res.data;
};
// =======================
