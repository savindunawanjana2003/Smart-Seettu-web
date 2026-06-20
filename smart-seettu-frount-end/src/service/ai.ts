import api from "./api";

export const sendMassegetoAi = async (message: string) => {
  const res = await api.post("ai/tockWithAi", { message: message });
  return res;
};
