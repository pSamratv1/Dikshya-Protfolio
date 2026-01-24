"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: any;
  // Now accepts specific width/height classes instead of aspect ratio
  // Default is full width of container, fixed height of 400px
  dimensions?: string;
}

export default function ProductCard({
  product,
  dimensions = "w-full h-[400px]", // Default dimensions
}: ProductCardProps) {
  const { addToCart } = useCart();
  const isOutOfStock = product.inStock === false;

  return (
    <div className="group relative">
      <Link href={`/shop/${product.id}`} className="block">
        {/* IMAGE CONTAINER */}
        {/* We apply the dimensions class here. 'relative' is needed for next/image fill */}
        <div
          className={`relative ${dimensions} bg-[#F4F4F4] overflow-hidden mb-4`}
        >
          {/* BADGES */}
          <div className="absolute top-3 left-3 z-20 flex flex-col gap-2 items-start">
            {product.isNew && (
              <div className="bg-white px-3 py-1 border border-black/5 shadow-sm">
                <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-black">
                  New
                </span>
              </div>
            )}
            {isOutOfStock ? (
              <div className="bg-[#1C1B1A] px-3 py-1">
                <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-white">
                  Sold Out
                </span>
              </div>
            ) : null}
          </div>

          {/* MAIN IMAGE */}
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-opacity duration-700 opacity-100 group-hover:opacity-0"
          />

          {/* HOVER IMAGE */}
          {product.images[1] ? (
            <Image
              src={product.images[1]}
              alt={product.name}
              fill
              className="object-cover absolute inset-0 transition-opacity duration-700 opacity-0 group-hover:opacity-100"
            />
          ) : (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover absolute inset-0"
            />
          )}

          {/* QUICK ADD BUTTON */}
          <div className="absolute bottom-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
            <button
              className="w-full bg-white/90 backdrop-blur border border-gray-200 py-3 text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
            >
              Quick Add
            </button>
          </div>
        </div>
      </Link>

      {/* TEXT INFO */}
      <div className="flex justify-between items-start">
        <div className="text-left">
          <Link href={`/shop/${product.id}`}>
            <h3 className="font-serif text-lg tracking-wide leading-none mb-1 group-hover:underline decoration-1 underline-offset-4">
              {product.name}
            </h3>
          </Link>
          <p className="font-sans text-xs text-gray-500 tracking-widest">
            Rs {product.price.toLocaleString()}
          </p>
        </div>

        {/* CART ICON */}
        <button
          onClick={() => addToCart(product)}
          className="p-2 -mt-2 -mr-2 text-gray-400 hover:text-black transition-colors"
        >
          <ShoppingBag size={18} />
        </button>
      </div>
    </div>
  );
}
