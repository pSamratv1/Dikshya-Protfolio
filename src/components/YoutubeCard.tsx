"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type YouTubeCardProps = {
  videoId: string;
  title: string;
  description: string;
  views?: number;
  likes?: number;
  comments?: number;
  index?: number; // Added index prop for alternating layout
};

const formatNumber = (num?: number) => {
  if (!num) return "—";
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toString();
};

export default function YouTubeCard(props: YouTubeCardProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageMaskRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  // Check if we should reverse the layout (Odd numbers: 1, 3, 5...)
  const isReversed = props.index ? props.index % 2 !== 0 : false;

  useEffect(() => {
    if (!containerRef.current || !imageMaskRef.current || !contentRef.current)
      return;

    const ctx = gsap.context(() => {
      // 1. IMAGE REVEAL (Clip Path)
      gsap.fromTo(
        imageMaskRef.current,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );

      // 2. IMAGE SCALE
      gsap.fromTo(
        imageRef.current,
        { scale: 1.3 },
        {
          scale: 1,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );

      // 3. TEXT FADE
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.4,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [props.index]); // Add dependency on index

  const thumbnail = `https://img.youtube.com/vi/${props.videoId}/maxresdefault.jpg`;
  const videoUrl = `https://www.youtube.com/watch?v=${props.videoId}`;

  return (
    <article ref={containerRef} className="editorial-card">
      <Link
        href={videoUrl}
        target="_blank"
        // Dynamically add the 'reversed' class based on index
        className={`card-inner-link ${isReversed ? "reversed" : ""}`}
      >
        {/* MEDIA WRAPPER */}
        <div className="card-media-wrapper">
          <div ref={imageMaskRef} className="media-mask">
            <Image
              ref={imageRef}
              src={thumbnail}
              alt={props.title}
              fill
              className="media-image"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="play-circle">
            <span className="play-triangle">▶</span>
          </div>
        </div>

        {/* CONTENT WRAPPER */}
        <div ref={contentRef} className="card-content">
          <div className="meta-top">
            <span className="tag">New Episode</span>
            <span className="dot">•</span>
            <span className="date">42 Min Listen</span>
          </div>

          <h3 className="card-title">{props.title}</h3>

          <div className="separator-line"></div>

          <p className="card-desc">{props.description}</p>

          <div className="meta-bottom">
            <div className="stat-item">
              <span className="stat-num">{formatNumber(props.views)}</span>
              <span className="stat-label">Views</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">{formatNumber(props.likes)}</span>
              <span className="stat-label">Likes</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">{formatNumber(props.comments)}</span>
              <span className="stat-label">Comments</span>
            </div>
            <div className="watch-actions">
              {/* <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.youtube.com/"
                className="watch-action"
              >
                Guest <span className="arrow-diagonal">↗</span>
              </Link> */}
              <div className="watch-action">
                Watch Now <span className="arrow-diagonal">↗</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
