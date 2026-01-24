"use client";

import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

// --- HELPERS: Detect Video Type ---
const getVideoType = (url: string) => {
  if (url.includes("tiktok.com")) return "tiktok";
  // Assume generic URLs are raw video files if they come from storage (ImageKit/Cloudinary) or end in extensions
  if (url.match(/\.(mp4|webm|mov)$/i) || url.includes("ik.imagekit.io"))
    return "raw";
  return "unknown";
};

const getTikTokID = (url: string) => {
  const match = url.match(/\/video\/(\d+)/);
  return match ? match[1] : null;
};

// --- COMPONENT: Raw Video Player (Auto-plays) ---
const RawVideoPlayer = ({
  url,
  isActive,
}: {
  url: string;
  isActive: boolean;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isActive]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setProgress(
        (videoRef.current.currentTime / videoRef.current.duration) * 100
      );
    }
  };

  return (
    <div className="relative w-full h-full bg-gray-100">
      <video
        ref={videoRef}
        src={url}
        muted={isMuted}
        loop
        playsInline
        onTimeUpdate={handleTimeUpdate}
        className="w-full h-full object-cover pointer-events-none"
      />

      {/* Overlays (Only Active) */}
      {isActive && (
        <>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="absolute top-3 right-3 z-20 w-8 h-8 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
          >
            {isMuted ? (
              <svg
                width="14"
                height="14"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zM6 5.04 4.312 6.39A.5.5 0 0 1 4 6.5H2v3h2a.5.5 0 0 1 .312.11L6 10.96V5.04zm7.854.606a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z" />
              </svg>
            ) : (
              <svg
                width="14"
                height="14"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z" />
                <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z" />
                <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zM6 5.04 4.312 6.39A.5.5 0 0 1 4 6.5H2v3h2a.5.5 0 0 1 .312.11L6 10.96V5.04z" />
              </svg>
            )}
          </button>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
            <div
              className="h-full bg-white transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </>
      )}
    </div>
  );
};

// --- COMPONENT: TikTok Embed (Click-to-play) ---
const TikTokPlayer = ({
  url,
  isActive,
}: {
  url: string;
  isActive: boolean;
}) => {
  const videoId = getTikTokID(url);
  if (!videoId)
    return (
      <div className="bg-black w-full h-full flex items-center justify-center text-white text-xs">
        Invalid TikTok Link
      </div>
    );

  return (
    <div className="w-full h-full bg-black relative">
      {/* 
         Overlay: This is crucial. 
         If !isActive, we cover the iframe so you can swipe the carousel without clicking into the iframe.
         If isActive, we remove it so you can click play.
      */}
      {!isActive && <div className="absolute inset-0 z-30 bg-transparent" />}

      <iframe
        src={`https://www.tiktok.com/embed/v2/${videoId}`}
        className="w-full h-full border-0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </div>
  );
};

// --- MAIN CARD WRAPPER ---
const ReelCard = ({
  videoUrl,
  isActive,
}: {
  videoUrl: string;
  isActive: boolean;
}) => {
  const type = getVideoType(videoUrl);

  return (
    <div
      className={`
      relative w-full h-full rounded-lg overflow-hidden transition-all duration-500 bg-gray-100
      ${
        isActive
          ? "shadow-2xl scale-100 opacity-100"
          : "scale-90 opacity-50 grayscale"
      }
    `}
    >
      {type === "raw" && <RawVideoPlayer url={videoUrl} isActive={isActive} />}
      {type === "tiktok" && <TikTokPlayer url={videoUrl} isActive={isActive} />}
      {type === "unknown" && (
        <div className="flex items-center justify-center h-full text-gray-400 text-xs text-center p-4">
          Unsupported Video Format
        </div>
      )}
    </div>
  );
};

// --- MAIN CAROUSEL COMPONENT ---
export default function ReelsCarousel({ videos = [] }: { videos: string[] }) {
  if (!videos || videos.length === 0) return null;

  // IMPORTANT: Duplicate slides if less than 5 to ensure Swiper Infinite Loop works perfectly
  // This prevents the "gap on the left" issue
  const displayVideos =
    videos.length < 5 ? [...videos, ...videos, ...videos] : videos;

  return (
    <div className="py-20 bg-white overflow-hidden border-t border-gray-100">
      <div className="w-full">
        <h2 className="font-serif text-2xl text-center mb-10 tracking-tight">
          Styled On Instagram
        </h2>

        <div className="relative w-full max-w-[1600px] mx-auto group/carousel px-4 md:px-0">
          <Swiper
            modules={[EffectCoverflow, Navigation]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 0, // Keep flat
              stretch: 0,
              depth: 100, // Push inactive slides back
              modifier: 1,
              slideShadows: false,
            }}
            navigation={{
              nextEl: ".reel-next",
              prevEl: ".reel-prev",
            }}
            breakpoints={{
              320: { slidesPerView: "auto", spaceBetween: 20 },
              768: { slidesPerView: "auto", spaceBetween: 30 },
              1024: { slidesPerView: "auto", spaceBetween: 40 },
            }}
            className="w-full py-8"
          >
            {displayVideos.map((video, idx) => (
              // Aspect Ratio 9:16 (Vertical Video)
              <SwiperSlide
                key={`${idx}-${video}`}
                className="!w-[260px] md:!w-[300px] aspect-[9/16]"
              >
                {({ isActive }) => (
                  <ReelCard videoUrl={video} isActive={isActive} />
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Arrows */}
          <button className="reel-prev absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-xl disabled:opacity-0 text-xl pb-1 opacity-0 group-hover/carousel:opacity-100">
            ←
          </button>
          <button className="reel-next absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-xl disabled:opacity-0 text-xl pb-1 opacity-0 group-hover/carousel:opacity-100">
            →
          </button>
        </div>
      </div>
    </div>
  );
}
    