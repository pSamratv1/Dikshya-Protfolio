// "use client";

// import { useRef } from "react";

// export default function HeroAnimation() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const contentRef = useRef<HTMLDivElement>(null);

//   return (
//     <div
//       className="relative w-full h-screen overflow-hidden"
//       ref={containerRef}
//     >
//       {/* Navigation */}
//       <nav>
//         <div className="nav-left">
//           <a href="#about" className="nav-link">
//             About
//           </a>
//           <a href="#podcast" className="nav-link">
//             Podcast
//           </a>
//           <a href="#values" className="nav-link">
//             Values
//           </a>
//           <a href="#contact" className="nav-link">
//             Contact
//           </a>
//         </div>

//         <div className="nav-center">
//           <a href="#" className="logo">
//             DIKSHYA LIMBU
//           </a>
//         </div>

//         <div className="nav-right">
//           <a href="#subscribe" className="nav-link">
//             Subscribe
//           </a>
//         </div>
//       </nav>

//       {/* Video Background */}
//       <div className="absolute inset-0 w-full h-full z-0">
//         <video
//           ref={videoRef}
//           autoPlay
//           muted
//           loop
//           playsInline
//           className="w-full h-full object-cover"
//         >
//           <source src="/201676-916080496.mp4" type="video/mp4" />
//         </video>
//         <div className="absolute inset-0 bg-black/30 z-10" />
//       </div>

//       {/* Hero Content */}
//       <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
//         <span className="inline-block mb-4 text-xs md:text-sm uppercase tracking-[0.2em] text-gray-200 font-medium">
//           The Portfolio
//         </span>

//         <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-none tracking-tight">
//           Find Your Niche.
//           <br />
//           Build with Intention.
//         </h1>

//         <p className="text-base md:text-lg text-gray-100 mb-10 max-w-lg leading-relaxed font-light">
//           Entrepreneur, podcast host, and connector sharing stories of mindset,
//           growth, and purpose from voices around the world.
//         </p>

//         <a
//           href="#about"
//           className="inline-block border-b border-white pb-1 text-sm uppercase tracking-[0.15em] text-white hover:opacity-70 transition-opacity"
//         >
//           Explore the Journey
//         </a>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroSequence() {
  const videoRef = useRef(null);

  // This state ensures animations trigger only after the component mounts
  // preventing server-side hydration mismatches.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="editorial-hero-wrapper">
      {/* --- LAYER 1: VIDEO --- */}
      <div className="video-layer">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="bg-video"
        >
          {/* Replace with your local file or hosted URL */}
          <source src="/201676-916080496.mp4" type="video/mp4" />
        </video>
      </div>

      {/* --- LAYER 2: THE SLIDING OVERLAY --- */}
      <div className="editorial-overlay">
        {/* --- LAYER 3: NAVBAR (Inside Overlay Context) --- */}
        <nav className="editorial-nav">
          <div className="nav-group nav-left">
            <a href="#about" className="nav-link">
              About
            </a>
            <a href="#podcast" className="nav-link">
              Podcast
            </a>
            <a href="#values" className="nav-link">
              Values
            </a>
            <a href="#contact" className="nav-link">
              Contact
            </a>
          </div>
          <div className="nav-center">
            <a href="#" className="logo">
              DIKSHYA LIMBU
            </a>
          </div>
          <div className="nav-group nav-right">
            <a href="#" className="nav-link">
              Subscribe
            </a>
          </div>
        </nav>

        {/* --- LAYER 4: HERO CONTENT --- */}
        <div className="hero-content">
          <span className="eyebrow animate-item animate-item-delay-1">
            The Portfolio
          </span>

          <h1 className="animate-item animate-item-delay-2">
            Find Your Niche.
            <br />
            Build with Intention.
          </h1>

          <p className="animate-item animate-item-delay-3">
            Entrepreneur, podcast host, and connector sharing stories of
            mindset, growth, and purpose from voices around the world.
          </p>

          <a
            href="#about"
            className="cta-btn animate-item animate-item-delay-4"
          >
            Explore the Journey
          </a>
        </div>
      </div>
    </div>
  );
}
