import { api } from "./client";

export const getAllProducts = async () => {
  console.log("API : ", api);

  const response = await api.get("/products");
  return response.data;
};
