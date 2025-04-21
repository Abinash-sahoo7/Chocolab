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

export interface Order {
  id: number;
  userId: number;
  userName: string;
  productId: number;
  productName: string;
  status: string;
  type: string;
  price: number;
  address: string;
  qty: number;
  // name: string;
  // image: string;
  // price: number;
  // description: string;
}

export interface orderStatusValue {
  orderId: number;
  status: string;
}
