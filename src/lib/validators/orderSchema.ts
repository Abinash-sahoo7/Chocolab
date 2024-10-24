import { z } from "zod";

export const orderSchema = z.object({
  productId: z.number({ message: "productId should be a number" }),
  pincode: z
    .string({ message: "pincode should be a string" })
    .length(6, "pincode should be 6 char long."),
  qty: z.number({ message: "qty should be a number" }),
  address: z
    .string({ message: "address should be a string" })
    .min(5, "address should be atleast 5 char long."),
});
