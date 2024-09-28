import { z } from "zod";

export const warehouseSchema = z.object({
  name: z.string({ message: "Warehouse name be a string." }),
  pincode: z
    .string({ message: "pincode must be 6 character or string." })
    .length(6),
});
