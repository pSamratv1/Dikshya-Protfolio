"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GalleryItem {
  id: string;
  imageUrl: string;
}

interface GalleryProps {
  data: GalleryItem[];
}

export default function GallerySection({ data }: GalleryProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const maskRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Safety check for empty data
  const images = data && data.length > 0 ? data : [];

  // Reveal Animation
  useEffect(() => {
    if (!containerRef.current || !maskRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        maskRef.current,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 50%",
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  // Auto-Slide Logic
  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  // Slide Animation
  useEffect(() => {
    if (!trackRef.current) return;
    const percent = -(100 * currentIndex);
    gsap.to(trackRef.current, {
      xPercent: percent,
      duration: 1,
      ease: "power3.inOut",
    });
  }, [currentIndex]);

  const handleNext = () => {
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  if (images.length === 0) return null; // Don't show section if empty

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="gallery-section container"
    >
      <div className="container">
        <div className="guests-header">
          <div className="header-content">
            <span className="eyebrow"> The Visual Diary</span>
            <h2 className="cursive ">Glimpse of My Journey</h2>
          </div>
        </div>

        <div ref={maskRef} className="gallery-mask">
          <div ref={trackRef} className="gallery-track">
            {images.map((item, i) => (
              <div key={item.id} className="gallery-slide">
                <div className="gallery-img-wrapper">
                  <Image
                    src={item.imageUrl}
                    alt={`Gallery ${i}`}
                    fill
                    className="gallery-img"
                  />
                </div>
              </div>
            ))}
          </div>

          <button onClick={handlePrev} className="gallery-btn prev">
            ←
          </button>
          <button onClick={handleNext} className="gallery-btn next">
            →
          </button>

          <div className="gallery-counter">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </div>
    </section>
  );
}
