"use client";

import { useEffect, useRef, useState } from "react";
import Header from "./Header";

// 1. Define the Prop Type
interface HeroProps {
  data: {
    videoUrl: string;
    eyebrow: string;
    headline: string;
    subheadline: string;
    ctaText: string;
    ctaLink: string;
  };
}

export default function HeroSequence({ data }: HeroProps) {
  const videoRef = useRef(null);

  // This state ensures animations trigger only after the component mounts
  // preventing server-side hydration mismatches.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const lines = data.headline
    .split(".")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line + ".");

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
          key={data.videoUrl}
        >
          {/* Replace with your local file or hosted URL */}
          <source src={data.videoUrl} type="video/mp4" />
        </video>
      </div>

      {/* --- LAYER 2: THE SLIDING OVERLAY --- */}
      <div className="editorial-overlay">
        {/* --- LAYER 3: NAVBAR (Inside Overlay Context) --- */}
        <Header />
        {/* Reels format Slider For Reels */}
        {/* Domin .co.uk */}
        {/* --- LAYER 4: HERO CONTENT --- */}
        <div className="hero-content">
          <span className="eyebrow animate-item animate-item-delay-1">
            {data.eyebrow}
          </span>
          {/* <div className="flex flex-col"> */}
          {lines.map((line, index) => (
            <h1 className="animate-item animate-item-delay-2" key={index}>
              {line}
              <br />
            </h1>
          ))}
          {/* </div> */}

          <p className="animate-item animate-item-delay-3">
            {data.subheadline}
          </p>

          <a
            href="#about"
            className="cta-btn animate-item animate-item-delay-4"
          >
            {data.ctaText}
          </a>
        </div>
      </div>
    </div>
  );
}
