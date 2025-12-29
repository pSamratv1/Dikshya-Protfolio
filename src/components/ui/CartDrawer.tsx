"use client";

import { useCart } from "../../app/context/cartContext";
import Image from "next/image";
import { useEffect } from "react";

export default function CartDrawer() {
  const { cart, isCartOpen, toggleCart, removeFromCart, cartTotal } = useCart();

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isCartOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={toggleCart}
        className={`fixed inset-0 bg-black/40 z-[99] transition-opacity duration-500 ${
          isCartOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[100] transform transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-6 flex justify-between items-center border-b border-gray-100">
          <h2 className="font-sans text-xs uppercase tracking-[0.2em] font-bold">
            Your Cart ({cart.length})
          </h2>
          <button
            onClick={toggleCart}
            className="text-2xl font-light hover:rotate-90 transition-transform"
          >
            ×
          </button>
        </div>

        {/* Items */}
        <div className="flex-grow overflow-y-auto p-6 space-y-8">
          {cart.length === 0 ? (
            <div className="h-full flex items-center justify-center text-center">
              <p className="font-serif text-gray-400 italic">
                Your cart is empty.
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="relative w-20 h-24 bg-gray-100 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg leading-tight">
                      {item.name}
                    </h3>
                    <p className="font-sans text-[10px] text-gray-500 mt-1 uppercase tracking-widest">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-xs text-gray-400">
                      Qty: {item.quantity}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[10px] uppercase border-b border-black pb-0.5 hover:opacity-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-[#F9F8F4]">
          <div className="flex justify-between mb-4 font-serif text-xl">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <button className="w-full bg-black text-white py-4 font-sans text-xs uppercase tracking-[0.25em] hover:bg-gray-800 transition-colors">
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}
