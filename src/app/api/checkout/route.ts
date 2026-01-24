import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe"; // We will create this utils file next
import { prisma } from "@/lib/prsima";
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
  const { cartItems } = await req.json();
  const user = await currentUser();

  if (!cartItems || cartItems.length === 0) {
    return new NextResponse("Cart is empty", { status: 400 });
  }

  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // 1. Create the Order in Database first (Status: PENDING)
  const order = await prisma.order.create({
    data: {
      userId: user?.id, // Allow guest checkout
      customerEmail: user.emailAddresses[0]?.emailAddress,
      total: 0, // Will update after calculation
      status: "PENDING",
      items: {
        create: cartItems.map((item: any) => ({
          product: { connect: { id: item.id } },
          quantity: item.quantity,
          price: item.price, // Store snapshot of price
        })),
      },
    },
    include: {
      items: true,
    },
  });

  // 2. Format Line Items for Stripe
  const line_items: any[] = [];
  let calculatedTotal = 0;

  cartItems.forEach((item: any) => {
    calculatedTotal += item.price * item.quantity;

    line_items.push({
      quantity: item.quantity,
      price_data: {
        currency: "NPR", // Or "USD"
        product_data: {
          name: item.name,
          images: [item.image], // Shows image in checkout
        },
        // Stripe expects amounts in smallest currency unit (e.g. cents/paisa)
        unit_amount: Math.round(item.price * 100),
      },
    });
  });

  // Update total in DB
  await prisma.order.update({
    where: { id: order.id },
    data: { total: calculatedTotal },
  });

  // 3. Create Stripe Session
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: { enabled: true },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?orderId=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/shop?canceled=1`,
    metadata: {
      orderId: order.id, // CRITICAL: This lets us find the order in the webhook
    },
  });

  return NextResponse.json({ url: session.url }, { headers: corsHeaders });
}
