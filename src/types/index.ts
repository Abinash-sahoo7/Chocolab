export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
}

export interface Warehouse {
  id: number;
  name: string;
  pincode: string;
}

export interface DeliveryPerson {
  id: number;
  name: string;
  phone: string;
  warehouseId: number;
  warehouseName: string;
  orderId: number;
}

export interface Inventory {
  id: number;
  sku: string;
  orderId: number;
  orderName: string;
  warehouseId: number;
  warehouseName: string;
  productId: number;
  productName: string;
}
