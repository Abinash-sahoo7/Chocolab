import { db } from "@/lib/db/db";
import { Warehouses } from "@/lib/db/schema";
import { warehouseSchema } from "@/lib/validators/warehouseSchema";
import { desc, eq } from "drizzle-orm";

export async function POST(request: Request) {
  const data = await request.json();

  let validateData;

  validateData = warehouseSchema.parse(data);
  const warehousePincode = validateData.pincode;

  try {
    const isPresentWarehouse = await db
      .select()
      .from(Warehouses)
      .where(eq(Warehouses.pincode, warehousePincode))
      .limit(1);

    if (isPresentWarehouse.length) {
      return Response.json(
        {
          message:
            "Their is a warehouse exists in this pincode. try with different pincode.",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    return Response.json(
      { message: "Failed to retrive warehouse pincode : ", error },
      { status: 500 }
    );
  }

  try {
    await db.insert(Warehouses).values(validateData);
  } catch (error) {
    return Response.json(
      { message: "Failed to Create Warehouse in database : ", error },
      { status: 500 }
    );
  }

  return Response.json(
    { message: "Warehouse created Successfully." },
    { status: 201 }
  );
}

export async function GET(request: Request) {
  try {
    const allWarehouses = await db
      .select()
      .from(Warehouses)
      .orderBy(desc(Warehouses.id));
    return Response.json(allWarehouses);
  } catch (error) {
    return Response.json(
      { message: "Failed to fetch all Warehouses" },
      { status: 500 }
    );
  }
}
