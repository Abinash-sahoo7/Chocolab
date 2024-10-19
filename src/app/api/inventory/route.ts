import { db } from "@/lib/db/db";
import { Inventories, orders, products, Warehouses } from "@/lib/db/schema";
import { inventorySchema } from "@/lib/validators/inventorySchema";
import { desc, eq } from "drizzle-orm";

export async function POST(request: Request) {
  const data = await request.json();

  let validateData;
  try {
    validateData = inventorySchema.parse(data);
  } catch (error) {
    return Response.json(
      {
        message: error,
      },
      { status: 400 }
    );
  }

  try {
    await db.insert(Inventories).values(validateData);
  } catch (error: any) {
    const errorMessage =
      error.code === "23505"
        ? { code: error.code, message: error.detail }
        : error;
    console.log("error : ", errorMessage);
    return Response.json({ message: errorMessage }, { status: 500 });
  }

  return Response.json(
    { message: "Inventory created Successfully." },
    { status: 201 }
  );
}

export async function GET() {
  try {
    const allInventories = await db
      .select({
        id: Inventories.id,
        sku: Inventories.sku,
        orderID: Inventories.orderId,
        warehouseId: Warehouses.id,
        warehouseName: Warehouses.name,
        productId: Inventories.productId,
        productname: products.name,
        updated_at: Inventories.updated_at,
        created_at: Inventories.created_at,
      })
      .from(Inventories)
      .leftJoin(Warehouses, eq(Inventories.warehouseId, Warehouses.id))
      .leftJoin(products, eq(Inventories.productId, products.id))
      .orderBy(desc(Inventories.id));

    return Response.json(allInventories);
  } catch (error) {
    return Response.json(
      {
        message: "Error occure in fetch all inventories. " + error,
      },
      { status: 500 }
    );
  }
}
