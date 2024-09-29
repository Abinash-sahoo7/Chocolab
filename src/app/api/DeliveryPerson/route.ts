import { db } from "@/lib/db/db";
import { DeliveryPersons, Warehouses } from "@/lib/db/schema";
import { DeliverpersonSchema } from "@/lib/validators/deliveryPersonSchema";
import { desc, eq } from "drizzle-orm";

export async function POST(request: Request) {
  const data = await request.json();

  let validateData;
  try {
    validateData = DeliverpersonSchema.parse(data);
  } catch (error) {
    return Response.json(
      {
        message: error,
      },
      { status: 400 }
    );
  }

  try {
    await db.insert(DeliveryPersons).values(validateData);
  } catch (error) {
    return Response.json(
      { message: "Failed to create Delivery person : ", error },
      { status: 500 }
    );
  }

  return Response.json(
    { message: "DeliveryPerson created Successfully." },
    { status: 201 }
  );
}

export async function GET() {
  try {
    const alldeliveyperson = await db
      .select({
        id: DeliveryPersons.id,
        name: DeliveryPersons.name,
        phone: DeliveryPersons.phone,
        warehouseId: Warehouses.id,
        warehouseName: Warehouses.name,
        updated_at: DeliveryPersons.updated_at,
        created_at: DeliveryPersons.created_at,
      })
      .from(DeliveryPersons)
      .leftJoin(Warehouses, eq(DeliveryPersons.id, Warehouses.id))
      .orderBy(desc(DeliveryPersons.id));
    return Response.json(alldeliveyperson);
  } catch (error) {
    return Response.json(
      { message: "Failed to fetch all Delivery Person. : ", error },
      { status: 500 }
    );
  }
}
