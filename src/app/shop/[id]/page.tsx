import { getProduct } from "@/lib/action";
import AddToCartButton from "@/components/ui/AddToCartButton"; // Client component
import Image from "next/image";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  if (!product) return <div>Product not found</div>;

  return (
    <div className="min-h-screen bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* LEFT: Image Gallery (Vertical Scroll) */}
        <div className="flex flex-col gap-1 lg:gap-2 px-0 lg:px-2 pt-20 lg:pt-32 pb-10">
          {product.images.map((img: any, idx: number) => (
            <div key={idx} className="relative w-full aspect-[3/4] bg-gray-50">
              <Image
                src={img}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* RIGHT: Sticky Details */}
        <div className="lg:h-screen lg:sticky lg:top-0 flex flex-col justify-center px-6 lg:px-20 py-20 lg:pt-32">
          <div className="max-w-md mx-auto w-full">
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2 block">
              {product.category}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl mb-4 leading-none">
              {product.name}
            </h1>
            <p className="font-sans text-lg mb-8 font-medium">
              ${product.price.toFixed(2)}
            </p>

            <div className="mb-10 text-gray-600 font-serif leading-relaxed text-sm">
              <p>{product.description}</p>
            </div>

            <AddToCartButton product={product} />

            {/* Extra Details Accordion Mockup */}
            <div className="mt-12 border-t border-gray-200">
              <div className="py-4 border-b border-gray-200 flex justify-between cursor-pointer">
                <span className="font-sans text-[10px] uppercase tracking-widest">
                  Details
                </span>
                <span>+</span>
              </div>
              <div className="py-4 border-b border-gray-200 flex justify-between cursor-pointer">
                <span className="font-sans text-[10px] uppercase tracking-widest">
                  Shipping
                </span>
                <span>+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
