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

export const setOnline = async (email: string) => {
  const rsp = await api.put("customer/setonline", { email });
  return rsp.data;
};

export const setOffline = async (email: string) => {
  const rsp = await api.put("customer/setOffline", { email });
  return rsp.data;
};

export const getAllcustormer = async () => {
  const rsp = await api.get("customer/getcustomer");
  return rsp.data.data;
};
