"use client";
import React from "react";
import { useEffect } from "react";

// Define Props
interface AboutProps {
  data: {
    eyebrow: string;
    title: string;
    lead: string;
    body: string;
    imageUrl: string;
    ctaText: string;
  };
}

const AboutSection = ({ data }: AboutProps) => {
  // Inside your component function:
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add a slight delay before starting to ensure the user really sees it
            setTimeout(() => {
              (entry.target as HTMLElement).style.animationPlayState =
                "running";
            }, 100);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    ); // Trigger when 10% of element is visible

    const hiddenElements = document.querySelectorAll(".fade-in-up");
    hiddenElements.forEach((el) => {
      (el as HTMLElement).style.animationPlayState = "paused";
      observer.observe(el);
    });
  }, []);

  return (
    <section id="about">
      <div className="container about-grid">
        {/* Text Column */}
        <div className="about-text-content">
          <div className="about-text-content-header">
            <span className="eyebrow fade-in-up">{data.eyebrow}</span>
            <h2 className="cursive fade-in-up delay-1">{data.title}</h2>
          </div>

          {/* Editorial 'Lead' Paragraph - Slightly larger */}
          <p className="about-lead fade-in-up delay-2">{data.lead}</p>

          {/* Standard Body Text */}
          <p className="about-body fade-in-up delay-3">{data.body}</p>

          {/* Optional: Signature or small link for extra polish */}
          <a href="#contact" className="cta-link fade-in-up delay-3">
            {data.ctaText}
          </a>
        </div>

        {/* Image Column */}
        <div className="about-image-wrapper fade-in-up delay-2">
          <img src={data.imageUrl} alt="Dikshya Limbu" className="about-img" />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
