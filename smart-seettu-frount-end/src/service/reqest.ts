import type { reqestDeatiles } from "../types/types";
import api from "./api";
// import type { loginDeatils } from "../components/Nave-bar";

export const saveReqest = async (objecta: reqestDeatiles) => {
  const res = await api.post("/reqest/saverequest", objecta);

  return res;
};

// export const getRequestByGroupAndMember = async (){}

export const getRequestsBymemberEmail = async (memberEmail: string) => {
  const res = await api.get(
    `/reqest/getpendingrequests?memberEmail=${memberEmail}`,
  );

  return res.data;
};
