import { getProducts } from "@/lib/action";
import Link from "next/link";
import Image from "next/image";
import CartDrawer from "@/components/ui/CartDrawer"; // Ensure this is in layout, or here if preferred

// Force dynamic to see new products
export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Custom Shop Nav (or reuse main nav) */}

      <div className="pt-32 pb-20 px-4 md:px-8">
        <h1 className="font-serif text-5xl md:text-7xl text-center mb-16 tracking-tight">
          COLLECTION
        </h1>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 max-w-[1800px] mx-auto">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/shop/${product.id}`}
              className="group block"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 mb-4">
                {/* Main Image */}
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Secondary Image (Hover Reveal) */}
                {product.images[1] && (
                  <Image
                    src={product.images[1]}
                    alt={product.name}
                    fill
                    className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                )}

                {/* Quick Add Overlay (Optional Luxury Touch) */}
                <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="bg-white/90 backdrop-blur text-center py-2 text-[10px] uppercase tracking-widest border border-gray-100">
                    Quick View
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="text-center">
                <h3 className="font-sans text-xs uppercase tracking-[0.15em] font-bold mb-1">
                  {product.name}
                </h3>
                <p className="font-serif text-gray-500 text-sm">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
