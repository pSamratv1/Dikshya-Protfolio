"use client";

import Link from "next/link";
import { CheckCircle, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useSearchParams } from "next/navigation";
import ShopHeader from "@/components/ShopHeader"; // Or your Navbar component
import Footer from "@/components/Footer";

export default function SuccessPage() {
  const { cart, removeFromCart } = useCart();
  const searchParams = useSearchParams();
  const orderId = searchParams?.get("orderId") || "";
  const [mounted, setMounted] = useState(false);

  // 1. Clear the cart on load
  useEffect(() => {
    setMounted(true);
    if (cart.length > 0) {
      // Loop through and remove all items to clear global state & local storage
      cart.forEach((item) => removeFromCart(item.id));
      localStorage.removeItem("dikshya_shop_cart");
    }
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#F9F8F4] flex flex-col justify-between">
      <ShopHeader />

      <main className="flex-grow flex items-center justify-center pt-32 pb-20 px-6">
        <div className="bg-white p-12 md:p-20 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] max-w-lg w-full text-center border border-gray-100 relative overflow-hidden">
          {/* Decorative Background Element */}
          <div className="absolute top-0 left-0 w-full h-1 bg-black" />

          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-[#F2F0E9] rounded-full flex items-center justify-center">
              <CheckCircle
                size={40}
                className="text-[#1C1B1A]"
                strokeWidth={1}
              />
            </div>
          </div>

          {/* Text */}
          <h1 className="font-serif text-4xl mb-4 text-[#1C1B1A]">
            Order Confirmed
          </h1>

          <div className="space-y-4 mb-10">
            <p className="font-sans text-[10px] uppercase tracking-widest text-gray-400">
              Thank you for your purchase
            </p>
            {orderId && (
              <p className="font-serif text-lg text-gray-600 italic">
                Order #{orderId.slice(0, 8).toUpperCase()}
              </p>
            )}
            <p className="font-sans text-xs text-gray-500 leading-relaxed max-w-xs mx-auto">
              We have received your order and will begin processing it shortly.
              You will receive an email confirmation soon.
            </p>
          </div>

          {/* Action */}
          <Link
            href="/shop"
            className="group flex items-center justify-center gap-3 w-full bg-[#1C1B1A] text-white py-4 font-sans text-[10px] uppercase tracking-[0.25em] hover:bg-[#B0A285] transition-all"
          >
            <ShoppingBag size={14} />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
