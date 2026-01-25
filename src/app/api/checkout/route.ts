import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    const { cartItems } = await req.json();
    const user = await currentUser();

    if (!cartItems || cartItems.length === 0) {
      return new NextResponse("Cart is empty", { status: 400 });
    }

    if (!user) {
      return new NextResponse("Unauthorized. Please log in.", { status: 401 });
    }

    // 1. Create the Order in Database first
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        customerEmail: user.emailAddresses[0]?.emailAddress,
        total: 0,
        status: "PENDING",
        isPaid: false,
        items: {
          create: cartItems.map((item: any) => ({
            product: { connect: { id: item.id } },
            quantity: item.quantity,
            price: Number(item.price),
          })),
        },
      },
    });

    // 2. Format Line Items
    const line_items: any[] = [];
    let calculatedTotal = 0;

    cartItems.forEach((item: any) => {
      const price = Number(item.price);
      calculatedTotal += price * item.quantity;

      line_items.push({
        quantity: item.quantity,
        price_data: {
          currency: "NPR",
          product_data: {
            name: item.name,
            images:
              item.image && item.image.startsWith("http") ? [item.image] : [],
          },
          unit_amount: Math.round(price * 100),
        },
      });
    });

    // Update total
    await prisma.order.update({
      where: { id: order.id },
      data: { total: calculatedTotal },
    });

    // 3. Create Stripe Session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      billing_address_collection: "required",
      customer_email: user.emailAddresses[0]?.emailAddress,
      phone_number_collection: { enabled: true },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?orderId=${order.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/shop?canceled=1`,
      metadata: {
        orderId: order.id,
      },
    });

    // --- 4. CRITICAL FIX: Save the Session ID to Database ---
    await prisma.order.update({
      where: { id: order.id },
      data: {
        stripeSessionId: session.id, // <--- This was missing!
      },
    });
    // -------------------------------------------------------

    return NextResponse.json({ url: session.url }, { headers: corsHeaders });
  } catch (error: any) {
    console.error("[CHECKOUT_ERROR]", error);
    return new NextResponse(error.message || "Internal Server Error", {
      status: 500,
    });
  }
}
