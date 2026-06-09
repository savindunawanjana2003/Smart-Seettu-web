import api from "./api";

export const refreshTokenCall = async (refreshToken: string) => {
  const res = await api.post("/ai/generateContent", { refreshToken });
  return res.data;
};
