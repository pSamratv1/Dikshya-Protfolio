"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "./ProductCard";

export default function RelatedProductsCarousel({
  products,
}: {
  products: any[];
}) {
  if (!products || products.length === 0) return null;

  return (
    <div className="w-full py-20  border-t border-gray-200">
      <div className="flex justify-end gap-3 mb-4 px-1">
        <button className="related-prev w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all disabled:opacity-30 disabled:cursor-not-allowed">
          ←
        </button>
        <button className="related-next w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all disabled:opacity-30 disabled:cursor-not-allowed">
          →
        </button>
      </div>

      <div className="w-full mx-auto px-6">
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1.2}
          navigation={{
            nextEl: ".related-next",
            prevEl: ".related-prev",
          }}
          breakpoints={{
            640: { slidesPerView: 2.2, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 30 },
          }}
          className="w-full"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              {/* Pass specific Width and Height classes here */}
              <ProductCard product={product} dimensions="w-[350px] h-[350px]" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

// ("use client");

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import ProductCard from "./ProductCard";

// export default function RelatedProductsCarousel({
//   products,
// }: {
//   products: any[];
// }) {
//   if (!products || products.length === 0) return null;

//   return (
//     <div className="w-full relative">
//       {/* 1. Navigation Buttons (Added here) */}
//       <div className="flex justify-end gap-3 mb-4 px-1">
//         <button className="related-prev w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all disabled:opacity-30 disabled:cursor-not-allowed">
//           ←
//         </button>
//         <button className="related-next w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all disabled:opacity-30 disabled:cursor-not-allowed">
//           →
//         </button>
//       </div>

//       {/* 2. Swiper */}
//       <Swiper
//         modules={[Navigation]}
//         spaceBetween={20}
//         slidesPerView={1.2}
//         navigation={{
//           nextEl: ".related-next", // Connects to button above
//           prevEl: ".related-prev", // Connects to button above
//         }}
//         breakpoints={{
//           640: { slidesPerView: 2.2, spaceBetween: 20 },
//           1024: { slidesPerView: 2.5, spaceBetween: 20 }, // Adjusted to fit sidebar width nicely
//         }}
//         className="w-full"
//       >
//         {products.map((product) => (
//           <SwiperSlide key={product.id}>
//             {/* Using aspect-[3/4] so it looks like a portrait product card */}
//             <ProductCard product={product} dimensions="w-full aspect-[3/4]" />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// }
