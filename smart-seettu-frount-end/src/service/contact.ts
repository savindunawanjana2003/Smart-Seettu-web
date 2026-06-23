import api from "./api";

export const getCustomers = async () => {
  const response = await api.get("/contact/getAllCustomers");
  return response.data;
};

export const createCustomer = async (customerData: any) => {
  const response = await api.post("/contact/addCustomer", customerData);
  return response.data;
};
