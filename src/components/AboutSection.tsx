"use client";
import React from "react";
import { useEffect } from "react";

const AboutSection = () => {
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
            <span className="eyebrow fade-in-up">About Dikshya</span>
            <h2 className="cursive fade-in-up delay-1">
              Confidence comes from Clarity.
            </h2>
          </div>

          {/* Editorial 'Lead' Paragraph - Slightly larger */}
          <p className="about-lead fade-in-up delay-2">
            I’m Dikshya Limbu — an entrepreneur and podcast host driven by
            meaningful conversations and intentional growth.
          </p>

          {/* Standard Body Text */}
          <p className="about-body fade-in-up delay-3">
            Through business, networking, and media, I connect people with
            ideas, opportunities, and perspectives that challenge how we think
            about success. I believe true influence is quiet, consistent, and
            built on the foundation of knowing exactly who you are.
          </p>

          {/* Optional: Signature or small link for extra polish */}
          <a href="#contact" className="cta-link fade-in-up delay-3">
            Read My Story
          </a>
        </div>

        {/* Image Column */}
        <div className="about-image-wrapper fade-in-up delay-2">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop"
            alt="Dikshya Limbu"
            className="about-img"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
