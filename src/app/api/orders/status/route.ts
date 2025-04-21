import { db } from "@/lib/db/db";
import { orders } from "@/lib/db/schema";
import { orderStatusSchema } from "@/lib/validators/orderstatusSchema";
import { eq } from "drizzle-orm";

export async function PATCH(request: Request) {
  const body = await request.json();

  try {
    let validateData = orderStatusSchema.parse(body);
    await db
      .update(orders)
      .set({ status: validateData.status })
      .where(eq(orders.id, validateData.orderId));

    return Response.json(
      {
        Status: validateData.status,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        message: "Error occurre During Updating status : ",
        error,
      },
      { status: 500 }
    );
  }
}
