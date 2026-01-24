"use client"; // <--- THIS IS CRITICAL

import { useCart } from "@/context/CartContext";

export function CartTrigger() {
  const { toggleCart, cart } = useCart();

  // Guard clause: prevent hydration errors if cart isn't loaded yet
  if (!cart) return null;

  return (
    <button
      onClick={toggleCart}
      className="font-sans text-[10px] uppercase tracking-widest hover:text-[#B0A285] transition-colors relative"
    >
      Cart ({cart.length})
    </button>
  );
}
