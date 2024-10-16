import { DeliveryPersonFormvalues } from "@/app/admin/delivery_persons/_components/create-deliveryPerson-form";
import { api } from "./client";

export const getAllProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const CreateProduct = async (data: FormData) => {
  const response = await api.post("/products", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getAllWarehouses = async () => {
  const response = await api.get("/warehouses");
  return response.data;
};

export const CreateWarehouse = async (data: FormData) => {
  console.log("Data : ", data);

  const response = await api.post("/warehouses", data);
  return response.data;
};

export const getAllDeliveryPersons = async () => {
  const response = await api.get("/DeliveryPerson");
  return response.data;
};

export const CreateDeliveryPerson = async (data: DeliveryPersonFormvalues) => {
  const response = await api.post("/DeliveryPerson", data);
  return response.data;
};
