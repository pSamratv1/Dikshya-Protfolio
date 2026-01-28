export const runtime = "nodejs";

import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";
import { Resend } from "resend"; // 1. Import Resend
import { OrderReceipt } from "@/components/email/OrderReceipt"; // 2. Import Template

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.text();
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
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const orderId = session?.metadata?.orderId;

    if (orderId) {
      try {
        // A. Update Database
        const updatedOrder = await prisma.order.update({
          where: { id: orderId },
          data: {
            isPaid: true,
            status: "PAID",
            stripeSessionId: session.id,
            address: session.customer_details?.address
              ? JSON.stringify(session.customer_details.address)
              : null,
            customerEmail: session.customer_details?.email || "",
            customerPhone: session.customer_details?.phone || "",
          },
          include: {
            items: {
              include: { product: true }, // Need product details for email
            },
          },
        });

        // B. Send Email via Resend
        if (updatedOrder.customerEmail) {
          try {
            await resend.emails.send({
              from: "onboarding@resend.dev", // Use 'onboarding@resend.dev' if you don't have a custom domain yet
              to: "hub4digital.ads@gmail.com",
              subject: `Order Confirmed #${updatedOrder.id.slice(0, 8)}`,
              react: OrderReceipt({
                orderId: updatedOrder.id,
                total: updatedOrder.total,
                customerName: session.customer_details?.name || "Customer",
                items: updatedOrder.items.map((item) => ({
                  productName: item.product.name,
                  quantity: item.quantity,
                  price: item.price,
                  // Use first image or fallback
                  image:
                    item.product.images[0] || "https://via.placeholder.com/150",
                })),
                shippingAddress: session.customer_details?.address,
              }),
            });
            // Must clear this point
            // console.log(`📧 Email sent to ${updatedOrder.customerEmail}`);
            console.log("Email sent to hub4digital.ads@gmail.com");
          } catch (emailError) {
            console.error(
              "Email failed, payment already confirmed",
              emailError
            );
          }
        }
      } catch (error) {
        console.error("Webhook processing error:", error);
        return new NextResponse("Error", { status: 500 });
      }
    }
  }

  return new NextResponse(null, { status: 200 });
}
