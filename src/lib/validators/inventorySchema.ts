import { z } from "zod";

export const inventorySchema = z.object({
  sku: z
    .string({ message: "sku be a string." })
    .length(8, "sku should be 8 char long."),
  warehouseId: z.number({ message: "warehouseId should be a number" }),
  productId: z.number({ message: "productId should be a number" }),
});
