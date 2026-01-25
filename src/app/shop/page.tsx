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

export default async function ShopPage() {
  const products: Product[] = await getProducts();

  return (
    <div className="min-h-screen  text-black ">
      <ShopHeader />

      <div className="pt-32 pb-20 px-6 md:px-12 max-w-[1800px] mx-auto">
        <div className="flex justify-between items-end mb-12 border-b border-gray-100">
          <h2 className="cursive fade-in-up delay-1">Collections</h2>
          <span className="font-sans text-[10px] uppercase tracking-widest text-gray-400">
            {products.length} Items
          </span>
        </div>

        <div className="flex">
          {/* Sidebar Filter */}
          <ShopFilter />

          {/* Product Grid */}
          <div className="flex-grow">
            <div className="px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-16">
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
