"use client";

import { useCart } from "../../app/context/cartContext";

export default function AddToCartButton({ product }: { product: any }) {
  const { addToCart } = useCart();

  // Map to cart item structure
  const cartItem = {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.images[0] || "",
  };

  return (
    <button
      onClick={() => addToCart(cartItem)}
      className="w-full bg-black text-white py-5 font-sans text-xs uppercase tracking-[0.25em] hover:bg-gray-800 transition-all active:scale-95"
    >
      Add to Cart
    </button>
  );
}
