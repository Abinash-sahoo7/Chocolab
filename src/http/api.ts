import { DeliveryPersonFormvalues } from "@/app/admin/delivery_persons/_components/create-deliveryPerson-form";
import { api } from "./client";
import { InventoryFormvalues } from "@/app/admin/inventory/_components/create-inventory-form";
import { OrderFormValues } from "@/app/(client)/product/[id]/page";

export const getAllProducts = async () => {
  const response = await api.get("/products");
  return await response.data;
};

export const CreateProduct = async (data: FormData) => {
  const response = await api.post("/products", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return await response.data;
};

export const getAllWarehouses = async () => {
  const response = await api.get("/warehouses");
  return await response.data;
};

export const CreateWarehouse = async (data: FormData) => {
  console.log("Data : ", data);

  const response = await api.post("/warehouses", data);
  return await response.data;
};

export const getAllDeliveryPersons = async () => {
  const response = await api.get("/DeliveryPerson");
  return await response.data;
};

export const CreateDeliveryPerson = async (data: DeliveryPersonFormvalues) => {
  const response = await api.post("/DeliveryPerson", data);
  return await response.data;
};

export const getAllInventories = async () => {
  const response = await api.get("/inventory");
  return await response.data;
};

export const CreateInventory = async (data: InventoryFormvalues) => {
  const response = await api.post("/inventory", data);
  return await response.data;
};

export const getSingleProduct = async (id: string) => {
  const response = await api.get(`/products/${id}`);
  return await response.data;
};

export const PlaceOrder = async (data: OrderFormValues) => {
  const response = await api.post("/orders", data);
  return await response.data;
};

export const getAllOrders = async () => {
  const response = await api.get("/orders");
  return await response.data;
};
