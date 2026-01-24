"use client";

import { useCart } from "@/context/CartContext";

export default function AddToCartButton({ product }: { product: any }) {
  const { addToCart } = useCart();

  const cartItem = {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.images[0] || "",
  };

  return (
    <button
      onClick={() => addToCart(cartItem)}
      className="w-full bg-[#1C1B1A] text-white py-5 font-sans text-xs uppercase tracking-[0.25em] hover:bg-[#B0A285] transition-all active:scale-95 duration-300"
    >
      Add to Bag
    </button>
  );
}
