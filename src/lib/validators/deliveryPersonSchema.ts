import { z } from "zod";

export const DeliverpersonSchema = z.object({
  name: z.string({ message: "Delivery Person name be a string." }),
  phone: z
    .string({ message: "phone number be a character or string." })
    .length(13, "phone number should be 13 char long."),
  warehouseId: z.number({ message: "warehouseId should be a number" }),
});
