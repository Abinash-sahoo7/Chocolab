import { z } from "zod";

const isServer = typeof window === "undefined";

export const productSchema = z.object({
  name: z
    .string({ message: "Product name be a string." })
    .min(4, { message: "product name should be atlease 4 char." }),
  image: z.instanceof(isServer ? File : FileList, {
    message: "product image should be a image.",
  }),
  description: z
    .string({ message: "description should be a string." })
    .min(4, { message: "product name should be atlease 4 char." }),
  price: z
    .number({ message: "product price should be a integer." })
    .min(1, { message: "Product price should be greater than 0." }),
});
