import { z } from "zod";

export const orderStatusSchema = z.object({
  orderId: z.number({ message: "productId should be a number" }),
  status: z.string({ message: "pincode should be a string" }),
});
