import React from "react";
import OverlaySection from "@/components/OverlaySection";

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <div className="w-full h-full relative">
          <iframe
            className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 object-cover"
            style={{
              aspectRatio: "16/9",
              minWidth: "100%",
              minHeight: "100%",
              width: "auto",
              height: "auto",
              pointerEvents: "none",
            }}
            src="https://www.youtube.com/embed/xuP4g7IDgDM?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=xuP4g7IDgDM"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <OverlaySection />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
