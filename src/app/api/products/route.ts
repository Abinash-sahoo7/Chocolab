import { db } from "@/lib/db/db";
import { products } from "@/lib/db/schema";
import { productSchema } from "@/lib/validators/productValidation";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "node:fs";
import { desc } from "drizzle-orm";

export async function POST(request: Request) {
  // User Access
  const data = await request.formData();

  let validatedata;
  let filePath;
  try {
    validatedata = productSchema.parse({
      name: data.get("name"),
      description: data.get("description"),
      image: data.get("image"),
      price: Number(data.get("price")),
    });
  } catch (error) {
    return Response.json({ message: error }, { status: 400 });
  }

  const filename = `${Date.now()}.${validatedata.image.name.split(".").at(-1)}`; //choco.png  27092024
  console.log("File name : ", validatedata.image.name);
  console.log("fileName : ", filename);

  try {
    const buffer = Buffer.from(await validatedata.image.arrayBuffer());
    console.log("FileBuffer : ", buffer);
    filePath = path.join(process.cwd(), "public/assets", filename);
    await writeFile(filePath, buffer);
  } catch (error) {
    return Response.json(
      { message: "Failed to save file to fs" },
      { status: 500 }
    );
  }

  try {
    await db.insert(products).values({ ...validatedata, image: filename });
  } catch (error) {
    // todo: delete the file save in fs.
    await fs.promises.unlink(filePath);
    return Response.json(
      { message: "Failed to store products in database." },
      { status: 500 }
    );
  }

  return Response.json(
    {
      message: "Product Created Successfully",
    },
    { status: 201 }
  );
}

export async function GET() {
  try {
    const allProducts = await db
      .select()
      .from(products)
      .orderBy(desc(products.id));
    return Response.json(allProducts);
  } catch (error) {
    return Response.json(
      { message: "Failed to fetch all products" },
      { status: 500 }
    );
  }
}
