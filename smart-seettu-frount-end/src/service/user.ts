import api from "./api";

export const registere = async (
  name: string,
  email: string,
  password: string,
  nic: string,
  poneNumber: string,
  address: string,
) => {
  const res = await api.post("auth/users/register", {
    name,
    email,
    password,
    nic,
    poneNumber,
    address,
  });

  return res;
};
