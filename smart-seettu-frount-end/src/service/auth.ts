import api from "./api";
// import type { loginDeatils } from "../components/Nave-bar";

export const loginfuntion = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  // alert(res.data.accessToken);
  return res;
  // accessToken: accessToken,
  //     refreshToken: refreshToken,
};
export const refreshTokenCall = async (refreshToken: string) => {
  const res = await api.post("/auth/callrefreshToken", { refreshToken });
  return res.data;
};

// .json({ message: "ok user avelable", data: { id: _id, roles, email } });

export const getMydeatiles = async () => {
  const res = await api.get("/auth/getMyDeatiles");
  return res;
};
