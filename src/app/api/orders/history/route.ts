import { authOptions } from "@/lib/auth/authOptions";
import { db } from "@/lib/db/db";
import { orders, products, users } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { number } from "zod";

export async function GET() {
  const session = await getServerSession(authOptions);

  //console.log("Session : ", session);

  if (!session) {
    return Response.json({ message: "Not Allowed" }, { status: 401 });
  }

  try {
    // Number(session.token.id),
    const myOrder = await db
      .select({
        id: orders.id,
        productId: orders.productId,
        quantity: orders.qty,
        price: orders.price,
        status: orders.status,
        address: orders.address,
        created_at: orders.created_at,
        updated_at: orders.updated_at,
        productName: products.name,
        type: orders.type,
        image: products.image,
        productDescription: products.description,
      })
      .from(orders)
      .leftJoin(products, eq(orders.productId, products.id))
      // @ts-ignore
      .where(eq(orders.userId, Number(session.token.id as string)));

    return Response.json(myOrder);
  } catch (err) {
    console.log("Error occure while gettonh order history - ", err);
    return Response.json(
      { message: "Failed to fetch single Orders : " + err },
      { status: 500 }
    );
  }
}
