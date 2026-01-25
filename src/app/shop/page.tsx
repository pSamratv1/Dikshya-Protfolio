import { getProducts } from "@/lib/action";
import ShopHeader from "@/components/ShopHeader";
import ShopFilter from "@/components/shop/ShopFilter";
import ProductCard from "@/components/shop/ProductCard";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number | null;
  description: string;
  details: string | null;
  care: string | null;
  images: string[];
  videos: string[];
  category: string;
  createdAt: Date;
}

// ... imports

export default async function ShopPage() {
  const products: Product[] = await getProducts();

  return (
    <div className="min-h-screen text-black bg-white">
      <ShopHeader />

      <div className="pt-24 md:pt-32 pb-20 px-4 md:px-12 max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end mb-8  border-b border-gray-100">
          <h2 className="font-serif text-3xl fade-in-up delay-1">
            Collections
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Sidebar Filter (Hidden on Mobile usually, or implement mobile filter) */}
          <div className="hidden lg:block">
            <ShopFilter />
          </div>

          {/* Product Grid */}
          <div className="flex-grow">
            {/* 
               Grid Fix:
               - Mobile: 1 column (w-full)
               - Tablet: 2 columns
               - Laptop: 3 columns
               - XL: 4 columns
            */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-16">
              {products.map((product: Product) => {
                return <ProductCard key={product.id} product={product} />;
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
