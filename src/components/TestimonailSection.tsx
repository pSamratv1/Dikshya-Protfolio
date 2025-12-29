"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
}

interface TestimonialProps {
  data: Testimonial[];
}

export default function TestimonialSection({ data }: TestimonialProps) {
  const [index, setIndex] = useState(0);
  const textRef = useRef<HTMLDivElement | null>(null);

  // Safety check
  const testimonials = data && data.length > 0 ? data : [];

  useEffect(() => {
    if (testimonials.length <= 1) return; // Don't animate if only 1

    const interval = setInterval(() => {
      gsap.to(textRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        onComplete: () => {
          setIndex((prev) => (prev + 1) % testimonials.length);
          gsap.fromTo(
            textRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
          );
        },
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section id="testimonials" className="testimonial-section">
      <div className="container">
        <span className="eyebrow align-center">Words from the Community</span>

        {testimonials.length === 0 ? (
          <p>No testimonials available</p>
        ) : (
          <div className="testimonial-wrapper">
            <div className="quote-mark">“</div>

            <div ref={textRef} className="testimonial-content">
              <h3 className="testimonial-quote">{testimonials[index].quote}</h3>
              <div className="testimonial-author">
                <span className="author-name">
                  {testimonials[index].author}
                </span>
                <span className="author-role">{testimonials[index].role}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
