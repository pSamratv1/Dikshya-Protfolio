"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: any;
  // FIX: Default is now responsive (shorter on mobile)
  dimensions?: string;
}

export default function ProductCard({
  product,
  dimensions = "w-full h-[300px] md:h-[400px]", // <--- RESPONSIVE HEIGHT
}: ProductCardProps) {
  const { addToCart } = useCart();
  const isOutOfStock = product.inStock === false;

  return (
    <div className="group relative w-full">
      <Link href={`/shop/${product.id}`} className="block">
        {/* IMAGE CONTAINER */}
        <div
          className={`relative ${dimensions} bg-[#F4F4F4] overflow-hidden mb-3`}
        >
          {/* BADGES */}
          <div className="absolute top-2 left-2 md:top-3 md:left-3 z-20 flex flex-col gap-2 items-start">
            {product.isNew && (
              <div className="bg-white px-2 py-0.5 md:px-3 md:py-1 border border-black/5 shadow-sm">
                <span className="font-sans text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-black">
                  New
                </span>
              </div>
            )}
            {isOutOfStock ? (
              <div className="bg-[#1C1B1A] px-2 py-0.5 md:px-3 md:py-1">
                <span className="font-sans text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-white">
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
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* HOVER IMAGE */}
          {product.images[1] ? (
            <Image
              src={product.images[1]}
              alt={product.name}
              fill
              className="object-cover absolute inset-0 transition-opacity duration-700 opacity-0 group-hover:opacity-100"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover absolute inset-0"
            />
          )}

          {/* QUICK ADD BUTTON (Hidden on Mobile for cleaner UI) */}
          <div className="hidden md:block absolute bottom-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
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
      <div className="flex justify-between items-start px-1">
        <div className="text-left w-full">
          <Link href={`/shop/${product.id}`}>
            {/* Clamp text to 1 line on mobile to prevent layout shift */}
            <h3 className="font-serif text-base font-medium md:text-lg tracking-wide leading-none mb-1 group-hover:underline decoration-1 underline-offset-4 truncate text-black">
              {product.name}
            </h3>
          </Link>
          <div className="flex justify-between items-center mt-1">
            <p className="font-sans text-[12px] font-medium md:text-xs text-gray-800 tracking-widest">
              Rs {product.price.toLocaleString()}
            </p>
            {/* Mobile Cart Icon (Visible because Quick Add is hidden) */}
            <button
              onClick={() => addToCart(product)}
              className="md:hidden text-gray-400 hover:text-black p-1"
            >
              <ShoppingBag size={16} />
            </button>
          </div>
        </div>

        {/* Desktop Cart Icon */}
        <button
          onClick={() => addToCart(product)}
          className="hidden md:block p-2 -mt-2 -mr-2 text-gray-400 hover:text-black transition-colors"
        >
          <ShoppingBag size={18} />
        </button>
      </div>
    </div>
  );
}
