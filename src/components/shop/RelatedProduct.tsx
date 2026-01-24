import Link from "next/link";
import Image from "next/image";

export default function RelatedProducts({ products }: { products: any[] }) {
  if (products.length === 0) return null;

  return (
    <div className="mt-24 border-t border-gray-100 pt-16 mb-20">
      <h3 className="font-serif text-3xl mb-10 text-center">
        You May Also Like
      </h3>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/shop/${product.id}`}
            className="group block"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 mb-3">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="text-center">
              <h4 className="font-sans text-[10px] uppercase tracking-widest font-bold mb-1">
                {product.name}
              </h4>
              <p className="font-serif text-sm text-gray-500">
                ${product.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
