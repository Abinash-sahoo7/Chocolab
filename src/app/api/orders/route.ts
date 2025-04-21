import { authOptions } from "@/lib/auth/authOptions";
import { db } from "@/lib/db/db";
import {
  DeliveryPersons,
  Inventories,
  orders,
  products,
  users,
  Warehouses,
} from "@/lib/db/schema";
import { ErrorLogWithFolderName } from "@/lib/errorLogger";
import { orderSchema } from "@/lib/validators/orderSchema";
import { and, eq, inArray, isNull, sql, desc } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { ErrorFolderName } from "@/enums/index";

export async function POST(request: Request) {
  // get Session
  const session = await getServerSession(authOptions);
  console.log("Session : ", session);

  if (!session) {
    return Response.json({ message: "Not Allowed" }, { status: 401 });
  }

  const requestData = await request.json();
  let validateData;

  try {
    validateData = await orderSchema.parse(requestData);
  } catch (err) {
    return Response.json({ message: err }, { status: 400 });
  }
  console.log("validateData : ", validateData);

  //Order Creation

  const warehouseResult = await db
    .select({ id: Warehouses.id })
    .from(Warehouses)
    .where(eq(Warehouses.pincode, validateData.pincode));

  if (!warehouseResult.length) {
    return Response.json(
      { message: "No wareHouse Found in this pIncode" },
      { status: 400 }
    );
  }

  const foundProduct = await db
    .select()
    .from(products)
    .where(eq(products.id, validateData.productId))
    .limit(1);

  if (!foundProduct.length) {
    return Response.json({ message: "No Product Found" }, { status: 400 });
  }

  let transactionError: string = "";
  let finalOrder: any = null;
  try {
    finalOrder = await db.transaction(async (tx) => {
      // Create Order
      const order = await tx
        .insert(orders)
        .values({
          ...validateData,
          // @ts-ignore
          userId: Number(session.token.id),
          price: foundProduct[0].price * validateData.qty,
          // Todo : move all statuses to Enum or number
          status: "received",
        })
        .returning({ id: orders.id, price: orders.price });

      // Check stock
      const avaiableStocks = await tx
        .select()
        .from(Inventories)
        .where(
          and(
            eq(Inventories.warehouseId, warehouseResult[0].id),
            eq(Inventories.productId, validateData.productId),
            isNull(Inventories.orderId)
          )
        )
        .limit(validateData.qty)
        .for("update", { skipLocked: true });

      // 2 < 3
      if (avaiableStocks.length < validateData.qty) {
        transactionError = `Stock is low, only ${avaiableStocks.length} products avaiable`;
        tx.rollback();
        return;
      }

      // check Delivery Person avaiablity

      const avaiableDeliveryPerson = await tx
        .select()
        .from(DeliveryPersons)
        .where(
          and(
            eq(DeliveryPersons.warehouseId, warehouseResult[0].id),
            isNull(DeliveryPersons.orderId)
          )
        )
        .for("update")
        .limit(1);

      if (!avaiableDeliveryPerson.length) {
        transactionError = `Delivery Person is not avaiable at the moment`;
        tx.rollback();
        return;
      }

      // Stock is avaiable and delivery Person is avaiable
      // update inventories table and add order_id

      await tx
        .update(Inventories)
        .set({ orderId: order[0].id })
        .where(
          inArray(
            Inventories.id,
            avaiableStocks.map((item) => item.id)
          )
        );

      // Update Delivery person

      await tx
        .update(DeliveryPersons)
        .set({ orderId: order[0].id })
        .where(eq(DeliveryPersons.id, avaiableDeliveryPerson[0].id));

      // update order status

      await tx
        .update(orders)
        .set({ status: "reserved" })
        .where(eq(orders.id, order[0].id));

      return order[0];
    });
  } catch (err) {
    return Response.json(
      {
        message: transactionError
          ? transactionError
          : "Error while db transaction.",
      },
      { status: 500 }
    );
  }

  // create payment
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: foundProduct[0].name,
              description: foundProduct[0].description,
            },
            unit_amount: foundProduct[0].price * 100, // Convert to cents
          },
          quantity: validateData.qty,
        },
      ],
      metadata: {
        orderId: finalOrder.id, // Store order ID for webhook
      },
      success_url: `${process.env.APP_BASE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.APP_BASE_URL}/payment/canceled`,
      payment_intent_data: {
        metadata: {
          orderId: finalOrder.id,
        },
      },
    });

    // Return the session URL to redirect the user
    return Response.json({ url: session.url });
  } catch (error) {
    console.error("Stripe session creation error:", error);
    // todo : can we retry the payment session creation again
    // we have to check the order status if it is reserved then we have to delete the order from orders table and delete the order from inventories table and delete the order from delivery persons table
    try {
      await db.transaction(async (tx) => {
        // Check if order exists and is reserved
        const existingOrder = await tx
          .select()
          .from(orders)
          .where(eq(orders.id, finalOrder.id));

        if (existingOrder[0]?.status === "reserved") {
          // Delete from delivery persons table
          await tx
            .update(DeliveryPersons)
            .set({ orderId: sql`NULL` })
            .where(eq(DeliveryPersons.orderId, finalOrder.id));

          // Delete from inventories table
          await tx
            .update(Inventories)
            .set({ orderId: sql`NULL` })
            .where(eq(Inventories.orderId, finalOrder.id));

          // Delete from orders table
          await tx.delete(orders).where(eq(orders.id, finalOrder.id));
        }
      });
    } catch (err) {
      console.error("Error cleaning up failed order:", err);
    }

    return Response.json(
      { message: "Error creating payment session" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    ErrorLogWithFolderName(
      ErrorFolderName.Order,
      "----------------------Start the get Api call for Order ------------------------"
    );
    const allOrders = await db
      .select({
        id: orders.id,
        productId: orders.productId,
        userId: orders.userId,
        quantity: orders.qty,
        totalPrice: orders.price,
        status: orders.status,
        address: orders.address,
        created_at: orders.created_at,
        updated_at: orders.updated_at,
        productName: products.name,
        userName: sql`${users.fname} || ' ' || ${users.lname}`,
        type: orders.type,
      })
      .from(orders)
      .leftJoin(products, eq(orders.productId, products.id))
      .leftJoin(users, eq(orders.userId, users.id))
      .orderBy(desc(orders.id));
    ErrorLogWithFolderName(
      ErrorFolderName.Order,
      "Total order count : " + allOrders.length
    );
    ErrorLogWithFolderName(
      ErrorFolderName.Order,
      "----------------------Finish the get Api call for Order ------------------------"
    );
    return Response.json(allOrders);
  } catch (error) {
    return Response.json(
      { message: "Failed to fetch all Orders" },
      { status: 500 }
    );
  }
}
