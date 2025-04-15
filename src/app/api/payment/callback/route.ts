import { headers } from "next/headers";
import { db } from "@/lib/db/db";
import { DeliveryPersons, Inventories, orders } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  try {
    // Get the raw body as text
    const rawBody = await req.text();

    // Log the request details for debugging
    console.log("Webhook received");
    console.log("Body length:", rawBody.length);

    // Get the signature from headers
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      console.error("No Stripe signature found in headers");
      return new Response("No Stripe signature found", { status: 400 });
    }

    console.log("Signature found:", signature.substring(0, 20) + "...");

    let event: Stripe.Event;

    try {
      // Construct the event with the raw body
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
      console.log("Event constructed successfully:", event.type);
    } catch (err: any) {
      console.error("Webhook signature verification failed:", err);
      return new Response(
        `Webhook signature verification failed: ${err.message}`,
        {
          status: 400,
        }
      );
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.orderId;

        if (!orderId) {
          console.error("No orderId found in session metadata");
          return new Response("No orderId found", { status: 400 });
        }

        // Update order status to "paid"
        await db
          .update(orders)
          .set({ status: "paid" })
          .where(eq(orders.id, parseInt(orderId)));

        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const orderId = paymentIntent.metadata?.orderId;

        if (!orderId) {
          console.error("No orderId found in payment intent metadata");
          return new Response("No orderId found", { status: 400 });
        }
        // Update deliver person set order id field NULL
        await db
          .update(DeliveryPersons)
          .set({ orderId: sql`NULL` })
          .where(eq(DeliveryPersons.orderId, parseInt(orderId)));

        // Update deliver person set order id field NULL
        await db
          .update(Inventories)
          .set({ orderId: sql`NULL` })
          .where(eq(Inventories.orderId, parseInt(orderId)));

        // Update order status to "failed"
        await db.delete(orders).where(eq(orders.id, parseInt(orderId)));

        break;
      }

      default:
        console.log(`(Ignoring) Unhandled event type ${event.type}`);
    }

    return new Response("Webhook processed successfully", { status: 200 });
  } catch (error: any) {
    console.error("Error processing webhook:", error);
    return new Response(`Error processing webhook: ${error.message}`, {
      status: 500,
    });
  }
}
