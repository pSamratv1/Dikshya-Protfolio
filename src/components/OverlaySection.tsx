"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

const OverlaySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    // Get all elements to animate
    const title = contentRef.current.querySelector(".title");
    const divider = contentRef.current.querySelector(".divider");
    const heading = contentRef.current.querySelector(".heading");
    const description = contentRef.current.querySelector(".description");
    const button = contentRef.current.querySelector(".button-container");

    // Create a GSAP matchMedia instance
    const mm = gsap.matchMedia();

    // Common initial states for all elements
    gsap.set([title, divider, heading, description, button], {
      y: 20,
      opacity: 0,
    });

    // Desktop animation (768px and up)
    mm.add("(min-width: 768px)", () => {
      // Position the container off-screen to the right
      gsap.set(contentRef.current, {
        x: "100%", // Start from the right edge of the container
        autoAlpha: 0,
        display: "block",
      });

      const tl = gsap.timeline({
        delay: 2,
        defaults: { duration: 0.5, ease: "power2.out" },
      });

      // Slide in from right to its natural position
      tl.to(
        contentRef.current,
        {
          x: 0,
          autoAlpha: 1,
          duration: 1,
          ease: "power3.out",
        },
        "start"
      );

      // Animate elements in sequence
      tl.to(
        title,
        { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
        "+=0.2"
      )
        .to(divider, { width: "100%", opacity: 1, duration: 0.4 }, "-=0.2")
        .to(heading, { y: 0, opacity: 1, duration: 0.5 }, "-=0.1")
        .to(description, { y: 0, opacity: 1, duration: 0.5 }, "-=0.2")
        .to(
          button,
          { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
          "-=0.1"
        );
    });

    // Mobile animation (below 768px)
    mm.add("(max-width: 767px)", () => {
      // Hide the container initially and position it off-screen to the right
      gsap.set(contentRef.current, {
        x: "100%",
        autoAlpha: 0,
        display: "block",
        width: "100%",
      });

      const tl = gsap.timeline({
        delay: 1.5, // Slightly shorter delay for mobile
        defaults: { duration: 0.4, ease: "power2.out" },
      });

      // Slide up from bottom
      tl.to(
        contentRef.current,
        {
          x: 0,
          opacity: 1,
          autoAlpha: 1,
          duration: 0.8,
        },
        "start"
      );

      // Faster, more compact animation for mobile
      tl.to(title, { y: 0, opacity: 1, duration: 0.5 }, "+=0.1")
        .to(divider, { width: "100%", opacity: 1, duration: 0.3 }, "-=0.1")
        .to(
          [heading, description],
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.1 },
          "-=0.1"
        )
        .to(button, { y: 0, opacity: 1, duration: 0.4 }, "-=0.1");
    });

    // Cleanup function
    return () => {
      mm.revert(); // Reverts all animations when the component unmounts
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="top-20 w-full md:w-[50%] h-[85vh] md:h-[100vh] z-10 overflow-hidden"
      style={{ padding: 0 }}
    >
      <div
        ref={contentRef}
        className="w-full h-full flex flex-col text-white px-6 md:px-16 pt-16 md:pt-24 pb-4 space-y-8 md:space-y-12"
        style={{
          backgroundColor: "rgb(239 68 68 / 0.9 )", // bg-red-500
        }}
      >
        <div className="title flex text-start font-condensed font-black text-7xl md:text-9xl text-black/70 uppercase tracking-widest subpixel-antialias">
          Niche That's Click Views
        </div>
        <div className="divider w-0 h-1 bg-black/70 opacity-0 "></div>
        <div className="flex flex-col space-y-2 md:space-y-4">
          <div className="heading text-black/80 font-sans font-medium text-lg md:text-2xl opacity-0 mt-2 md:mt-4">
            Find Your Niche. Fuel Your Growth.
          </div>
          <p className="description text-black/80 font-sans font-light text-sm md:text-base md:text-black/80 opacity-0">
            Join Dikshya Limbu as she connects with leaders, entrepreneurs, and
            change-makers from around the world, uncovering stories, strategies,
            and mindsets that inspire you to discover your own path and thrive.
          </p>
        </div>

        <div className="button-container flex justify-center opacity-0">
          <button className="bg-black/80 text-white px-6 py-2 rounded-md hover:bg-gray-200 hover:text-black transition-colors duration-300 w-fit">
            Know More About Me
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverlaySection;
