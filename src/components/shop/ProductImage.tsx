"use client";

import Image from "next/image";
import { useState, useRef } from "react";

export default function ProductImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();

    // Calculate percentage position
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setMousePosition({ x, y });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[3/4] bg-[#FAFAFA] overflow-hidden cursor-crosshair group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {/* 1. Base Image (Visible by default) */}
      <div
        className={`w-full h-full transition-opacity duration-300 ${
          isHovering ? "opacity-0" : "opacity-100"
        }`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          // 'contain' ensures the whole image fits inside the box without cropping
          className="object-contain p-8 md:p-12 mix-blend-multiply"
        />
      </div>

      {/* 2. Zoomed Image (Visible on Hover) */}
      {isHovering && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(${src})`,
            backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
            backgroundSize: "250%", // Zoom level (2.5x)
            backgroundRepeat: "no-repeat",
          }}
        />
      )}
    </div>
  );
}
