"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";

export default function SuccessPage() {
  const { cart, removeFromCart } = useCart();

  // Clear cart on success
  useEffect(() => {
    // In a real app, you might want to verify orderId from URL first
    // For now, we assume success clears the cart
    cart.forEach((item) => removeFromCart(item.id));
    localStorage.removeItem("dikshya_shop_cart");
  }, []);

  return (
    <div className="min-h-screen bg-[#F9F8F4] flex flex-col items-center justify-center text-center px-4">
      <div className="bg-white p-12 md:p-20 shadow-sm border border-gray-100 max-w-lg w-full">
        <div className="flex justify-center mb-6">
          <CheckCircle size={64} className="text-[#B0A285]" strokeWidth={1} />
        </div>
        <h1 className="font-serif text-4xl mb-4">Order Confirmed</h1>
        <p className="font-sans text-gray-500 text-xs uppercase tracking-widest mb-10 leading-relaxed">
          Thank you for your purchase. <br />
          We have sent a confirmation email with your order details.
        </p>
        <Link
          href="/shop"
          className="inline-block border-b border-black pb-1 text-xs uppercase tracking-widest hover:opacity-50 transition-opacity"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
