"use client";

import { useCart } from "@/context/CartContext";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { createOrder } from "@/lib/action";
import Image from "next/image";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isProcessing, setIsProcessing] = useState(false);

  // Security Redirects
  useEffect(() => {
    if (isLoaded && !user) router.push("/shop"); // Kick out if not logged in
    if (isLoaded && cart.length === 0) router.push("/shop"); // Kick out if empty cart
  }, [isLoaded, user, cart, router]);

  if (!isLoaded || !user)
    return (
      <div className="min-h-screen flex items-center justify-center font-serif text-2xl animate-pulse">
        Loading Secure Checkout...
      </div>
    );

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // 1. Simulate Stripe Delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // 2. Create Order in Database
    startTransition(async () => {
      const result = await createOrder(
        cart,
        cartTotal,
        user.id,
        user.primaryEmailAddress?.emailAddress || ""
      );

      if (result.success) {
        clearCart(); // Wipe cart
        router.push(`/shop/success?order=${result.orderId}`);
      } else {
        alert("Payment Failed");
        setIsProcessing(false);
      }
    });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#1C1B1A]">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* LEFT: SUMMARY */}
        <div className="bg-[#F9F8F4] p-8 lg:p-20 order-2 lg:order-1 border-r border-gray-100">
          <div className="max-w-lg mx-auto sticky top-20">
            <h2 className="font-serif text-3xl mb-8">Order Summary</h2>
            <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-6">
                  <div className="relative w-16 h-20 bg-white shadow-sm flex-shrink-0">
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                      {item.quantity}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif text-lg leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-6 space-y-3">
              <div className="flex justify-between text-sm uppercase tracking-widest text-gray-500">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm uppercase tracking-widest text-gray-500">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-2xl font-serif mt-6 pt-6 border-t border-gray-200">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: PAYMENT FORM */}
        <div className="p-8 lg:p-20 order-1 lg:order-2 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-12">
              <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                Secure Payment
              </span>
              <h1 className="font-serif text-5xl mt-2">Checkout</h1>
            </div>

            <form onSubmit={handlePayment} className="space-y-10">
              <div className="space-y-6">
                <p className="font-sans text-[10px] uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-2">
                  Shipping Details
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <input
                    required
                    placeholder="First Name"
                    className="w-full border-b border-gray-200 py-3 bg-transparent outline-none placeholder:text-gray-300 font-serif text-lg"
                  />
                  <input
                    required
                    placeholder="Last Name"
                    className="w-full border-b border-gray-200 py-3 bg-transparent outline-none placeholder:text-gray-300 font-serif text-lg"
                  />
                </div>
                <input
                  required
                  placeholder="Street Address"
                  className="w-full border-b border-gray-200 py-3 bg-transparent outline-none placeholder:text-gray-300 font-serif text-lg"
                />
                <div className="grid grid-cols-2 gap-6">
                  <input
                    required
                    placeholder="City"
                    className="w-full border-b border-gray-200 py-3 bg-transparent outline-none placeholder:text-gray-300 font-serif text-lg"
                  />
                  <input
                    required
                    placeholder="Postal Code"
                    className="w-full border-b border-gray-200 py-3 bg-transparent outline-none placeholder:text-gray-300 font-serif text-lg"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <p className="font-sans text-[10px] uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-2">
                  Payment Method
                </p>
                <div className="border border-gray-200 p-6 bg-gray-50/30 rounded-sm">
                  <div className="mb-6">
                    <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2">
                      Card Number
                    </label>
                    <input
                      required
                      placeholder="0000 0000 0000 0000"
                      className="w-full bg-transparent outline-none font-serif text-xl tracking-widest placeholder:text-gray-300"
                    />
                  </div>
                  <div className="flex gap-6">
                    <div className="w-1/2">
                      <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2">
                        Expiry
                      </label>
                      <input
                        required
                        placeholder="MM/YY"
                        className="w-full bg-transparent outline-none font-serif text-xl placeholder:text-gray-300"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2">
                        CVC
                      </label>
                      <input
                        required
                        placeholder="123"
                        className="w-full bg-transparent outline-none font-serif text-xl placeholder:text-gray-300"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                disabled={isProcessing}
                className="w-full bg-[#1C1B1A] text-white py-6 font-sans text-xs uppercase tracking-[0.25em] hover:bg-[#B0A285] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isProcessing
                  ? "Processing Payment..."
                  : `Pay $${cartTotal.toFixed(2)}`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
