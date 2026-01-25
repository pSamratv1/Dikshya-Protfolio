import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();

  // NEXT.JS 15 FIX: You must await headers()
  const headerPayload = await headers();
  const signature = headerPayload.get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    console.error("Webhook signature verification failed.", error.message);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  // HANDLE SUCCESSFUL PAYMENT
  if (event.type === "checkout.session.completed") {
    // 1. Get the Order ID we passed in metadata
    const orderId = session?.metadata?.orderId;

    if (orderId) {
      try {
        // 2. Update the Order in Database
        await prisma.order.update({
          where: {
            id: orderId,
          },
          data: {
            isPaid: true,
            status: "PAID",

            // Update Session ID again just to be safe/consistent
            stripeSessionId: session.id,

            // Capture customer info from Stripe if they changed it during checkout
            customerEmail: session.customer_details?.email || "",
            address: session.customer_details?.address
              ? JSON.stringify(session.customer_details.address)
              : null,
          },
        });
        console.log(`✅ Order ${orderId} marked as PAID`);
      } catch (error) {
        console.error("Error updating order in database:", error);
        return new NextResponse("Database Error", { status: 500 });
      }
    }
  }

  return new NextResponse(null, { status: 200 });
}
