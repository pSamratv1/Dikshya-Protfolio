"use client";

import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/shop/AddToCartButton";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
}

export default function ShopPreviewSection({
  products,
}: {
  products: Product[];
}) {
  // Show only first 4 items
  const featuredProducts = products?.slice(0, 4) || [];

  if (featuredProducts.length === 0) return null;

  return (
    <section className="shop-preview-section py-24 bg-white border-b border-gray-100">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#B0A285] mb-2 block">
              The Collection
            </span>
            <h2 className="font-serif text-5xl text-[#1C1B1A]">
              Curated Essentials
            </h2>
          </div>
          <Link
            href="/shop"
            className="group flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] border-b border-black pb-1 hover:text-[#B0A285] hover:border-[#B0A285] transition-colors"
          >
            View Shop
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group flex flex-col">
              {/* Image Card */}
              <Link
                href={`/shop/${product.id}`}
                className="relative aspect-[3/4] bg-[#F9F8F4] overflow-hidden mb-6 cursor-pointer"
              >
                {product.images[0] ? (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 font-serif italic">
                    No Image
                  </div>
                )}

                {/* Hover Reveal Image (if exists) */}
                {product.images[1] && (
                  <Image
                    src={product.images[1]}
                    alt={product.name}
                    fill
                    className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                )}

                {/* Quick Cart Button (Optional Luxury Touch) */}
                <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="bg-white p-2 rounded-full shadow-lg">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                  </div>
                </div>
              </Link>

              {/* Info */}
              <div className="flex justify-between items-start">
                <Link href={`/shop/${product.id}`}>
                  <h3 className="font-serif text-xl leading-none mb-1 group-hover:text-[#B0A285] transition-colors">
                    {product.name}
                  </h3>
                  <p className="font-sans text-[10px] text-gray-400 uppercase tracking-widest">
                    {product.category}
                  </p>
                </Link>
                <span className="font-sans text-sm font-medium">
                  ${product.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
