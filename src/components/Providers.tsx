"use client";

import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/shop/CartDrawer";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <CartDrawer />
      {children}
    </CartProvider>
  );
}
