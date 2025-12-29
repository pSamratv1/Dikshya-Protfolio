"use client";

import Image from "next/image";

export default function ContactSection() {
  return (
    <section id="contact" className="contact-section container">
      <div className="container contact-grid">
        {/* Top: Eyebrow & Header */}
        <div className="contact-header">
          <div className="header-content">
            <span className="eyebrow fade-in-up delay-1">Contact</span>
            <h2 className="cursive fade-in-up delay-1">Get in Touch</h2>
          </div>
        </div>

        <div className="contact-image-form-grid">
          {" "}
          {/* Left: Illustration / Visual */}
          <div className="contact-visual hidden md:block">
            <div className="visual-wrapper-framed">
              {/* Using 'contain' to ensure NO cropping */}
              <Image
                src="https://images.unsplash.com/photo-1506784365847-bbad939e9335?q=80&w=800&auto=format&fit=cover"
                alt="Abstract Art"
                fill
                className="contact-img-cover"
              />
              {/* Overlay Text */}
              <div className="visual-overlay">
                <p>
                  Let's create something
                  <br />
                  meaningful together.
                </p>
              </div>
            </div>
          </div>
          {/* Right: The Form */}
          <div className="contact-form-wrapper">
            <div className="form-header">
              <p className="form-desc">
                For podcast inquiries, collaborations, or speaking engagements.
              </p>
            </div>

            <form className="luxury-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Jane Doe" />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="jane@example.com" />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                Send Message <span className="btn-arrow">→</span>
              </button>
            </form>

            {/* <div className="contact-direct">
            <span>Direct Email:</span>
            <a href="mailto:hello@dikshyalimbu.com">hello@dikshyalimbu.com</a>
          </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
