"use client";

import { useState, MouseEvent } from "react";
import Image from "next/image";

export default function ProductGallery({ images }: { images: string[] }) {
  const [activeImg, setActiveImg] = useState(0);
  const [zoomStyle, setZoomStyle] = useState({
    opacity: 0,
    transform: "scale(1)",
    transformOrigin: "center",
  });

  const handleNext = () =>
    setActiveImg((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  const handlePrev = () =>
    setActiveImg((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      opacity: 1,
      transform: "scale(2)", // 2x Zoom
      transformOrigin: `${x}% ${y}%`,
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      opacity: 0,
      transform: "scale(1)",
      transformOrigin: "center",
    });
  };

  return (
    <div className="flex gap-4 h-full sticky top-32">
      {/* 1. Left Thumbnails */}
      <div className="hidden lg:flex flex-col gap-4 w-20 flex-shrink-0 h-[600px] overflow-y-auto no-scrollbar">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImg(idx)}
            className={`relative w-full aspect-[3/4] border transition-all ${
              activeImg === idx
                ? "border-black opacity-100"
                : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <Image src={img} alt="Thumbnail" fill className="object-cover" />
          </button>
        ))}
      </div>

      {/* 2. Main Image Area */}
      <div className="relative flex-grow aspect-[3/4] lg:aspect-auto lg:h-[800px] bg-[#F9F9F9] overflow-hidden group cursor-crosshair">
        {/* The Image (With Zoom Transform) */}
        <div
          className="relative w-full h-full"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <Image
            src={images[activeImg]}
            alt="Product"
            fill
            className="object-cover transition-transform duration-200 ease-out"
            style={{
              transform: zoomStyle.transform,
              transformOrigin: zoomStyle.transformOrigin,
            }}
          />
        </div>

        {/* Slider Buttons (Visible on Hover) */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black hover:text-white"
        >
          ←
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black hover:text-white"
        >
          →
        </button>
      </div>
    </div>
  );
}
