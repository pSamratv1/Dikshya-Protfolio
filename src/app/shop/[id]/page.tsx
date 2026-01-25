import { getProducts, getProductReviews } from "@/lib/action";
import ShopHeader from "@/components/ShopHeader";
import ProductGallery from "@/components/shop/ProductGallery";
import ProductInfo from "@/components/shop/ProductInfo";
import RelatedProductsCarousel from "@/components/shop/RelatedProductCarousel";
import ReelsCarousel from "@/components/shop/ProductReels";
import ProductReviews from "@/components/shop/ProductReview";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const products = await getProducts();
  const product = products.find((p: any) => p.id === id);
  const allProducts = await getProducts();
  const relatedProducts = allProducts
    .filter((p: any) => p.id !== id)
    .slice(0, 4);
  const reviews = await getProductReviews(id);
  console.log(reviews, "Reviews");

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="font-serif text-3xl mb-4">Product Not Found</h1>
          <a
            href="/shop"
            className="text-xs uppercase tracking-widest border-b border-black pb-1"
          >
            Return to Shop
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <ShopHeader />

      {/* 
         LAYOUT CONTAINER
         We use 'items-start' to ensure the sticky element has room to stick 
         while the other column grows tall.
      */}
      <div className=" text-black mt-32 px-6 lg:px-16 pb-20">
        <div className="lg:grid lg:grid-cols-12 gap-12 items-start relative">
          {/* --- LEFT COLUMN: STICKY IMAGE --- */}
          <div className="lg:col-span-7 lg:sticky lg:top-32 h-fit">
            <ProductGallery images={product.images || []} />
          </div>

          {/* --- RIGHT COLUMN: SCROLLABLE CONTENT --- */}
          {/* This column contains Details -> Reels -> Recommendations */}
          <div className="lg:col-span-5 flex flex-col gap-20">
            {/* 1. Details Accordions & Cart Button */}
            <div className=" relative z-10">
              <ProductInfo product={product} />
            </div>

            {/* 2. Reels Section (Now inside the scrollable flow) */}
            <div className="w-full">
              <ReelsCarousel videos={product.videos} />
            </div>
          </div>
        </div>

        {/* 3. Recommendations (Now inside the scrollable flow) */}

        <div className="w-full  lg:mx-0 my-20">
          <h2 className="font-serif text-2xl text-center mb-8 uppercase tracking-wide">
            You May Also Like
          </h2>

          {/* FIX: Removed the 'grid grid-cols-2' div wrapper here. */}
          {/* The Carousel handles its own layout internally. */}
          <RelatedProductsCarousel products={relatedProducts} />
        </div>

        {/* --- BOTTOM SECTION (Scrolled past everything) --- */}
        {/* REVIEWS */}
        {/* --- REVIEWS SECTION (Replaces the static placeholder) --- */}
        <ProductReviews
          productId={product.id}
          reviews={reviews}
          productName={product.name}
          productImage={product.images[0]}
        />
      </div>
    </div>
  );
}
