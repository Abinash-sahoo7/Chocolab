import { api } from "./client";

export const getAllProducts = async () => {
  //console.log("API : ", api);

  const response = await api.get("/products");
  return response.data;
};

export const CreateProduct = async (data: FormData) => {
  console.log("Data : ", data);

  const response = await api.post("/products", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getAllWarehouses = async () => {
  //console.log("API : ", api);

  const response = await api.get("/warehouses");
  return response.data;
};

export const CreateWarehouse = async (data: FormData) => {
  console.log("Data : ", data);

  const response = await api.post("/warehouses", data);
  return response.data;
};
