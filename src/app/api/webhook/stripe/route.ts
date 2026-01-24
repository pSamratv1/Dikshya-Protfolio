import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prsima";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  // HANDLE SUCCESSFUL PAYMENT
  if (event.type === "checkout.session.completed") {
    // Retrieve the order using the metadata we sent in Step 4
    if (session?.metadata?.orderId) {
      await prisma.order.update({
        where: {
          id: session.metadata.orderId,
        },
        data: {
          isPaid: true,
          status: "PAID",
          stripeSessionId: session.id,
          address: JSON.stringify(session.customer_details?.address),
          customerEmail: session.customer_details?.email || "",
        },
      });
    }
  }

  return new NextResponse(null, { status: 200 });
}
