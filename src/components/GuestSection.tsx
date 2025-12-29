"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 1. Define Props
interface Guest {
  id: string;
  name: string;
  role: string;
  image: string;
  link: string;
}

interface GuestProps {
  data: Guest[];
}

export default function GuestsSection({ data }: GuestProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(4);

  // 1. Responsive Logic: Determine how many items to show based on width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(1); // Mobile: 1 item
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2); // Tablet: 2 items
      } else {
        setItemsToShow(4); // Desktop: 4 items
      }
    };

    // Set initial
    handleResize();

    // Add listener
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const guestsList = data || []; // Safety check
  const maxIndex = Math.max(0, guestsList.length - itemsToShow);

  // 2. Initial Animation (Fade Up)
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".guest-card", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 50%",
        },
      });
    });
    return () => ctx.revert();
  }, []);

  // 3. Slide Animation Handler
  useEffect(() => {
    if (!trackRef.current) return;

    // Calculate move percentage based on dynamic itemsToShow
    const percentMove = -(100 / itemsToShow) * currentIndex;

    gsap.to(trackRef.current, {
      xPercent: percentMove,
      duration: 0.8,
      ease: "power3.inOut",
    });
  }, [currentIndex, itemsToShow]);

  const handleNext = () => {
    if (currentIndex < maxIndex) setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  return (
    <section id="#guests" ref={sectionRef} className="container">
      <div className="guests-section ">
        {/* Header */}
        <div ref={headerRef} className="guests-header">
          <div className="header-content">
            <span className="eyebrow fade-in-up delay-1">The Network</span>
            <h2 className="cursive fade-in-up delay-1">Featured Guests</h2>
          </div>
        </div>

        {/* Carousel Window */}
        <div className="guests-carousel-window">
          {/* Controls */}
          <div className="slider-controls">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="nav-btn prev-btn"
              aria-label="Previous Guest"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className="nav-btn next-btn"
              aria-label="Next Guest"
            >
              →
            </button>
          </div>

          {/* Sliding Track */}
          <div ref={trackRef} className="guests-track">
            {guestsList.map((guest, index) => (
              <Link
                key={index}
                href={guest.link}
                target="_blank"
                className="guest-card"
                // 4. Dynamic Width via Inline Style
                style={{ flex: `0 0 ${100 / itemsToShow}%` }}
              >
                <div className="guest-card-inner">
                  <div className="guest-image-wrapper">
                    <div className="backdrop-circle"></div>
                    <div className="photo-mask">
                      <Image
                        src={guest.image}
                        alt={guest.name}
                        fill
                        className="guest-img"
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                    </div>
                    <div className="link-overlay">
                      <span className="arrow-icon">↗</span>
                    </div>
                  </div>

                  <div className="guest-info">
                    <h3 className="guest-name">{guest.name}</h3>
                    <span className="guest-role">{guest.role}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
