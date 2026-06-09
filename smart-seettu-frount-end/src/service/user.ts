import api from "./api";

export const registere = async (
  username: string,
  userEmail: string,
  userPassword: string,
  userRole: string,
) => {
  const res = await api.post("/user/create", {
    username,
    userEmail,
    userPassword,
    userRole,
  });
  return res;
};
