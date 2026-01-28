"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`editorial-nav ${isScrolled ? "nav-scrolled" : ""}`}>
      <div className="nav-container">
        {/* 1. LEFT SIDE: Menu Links */}
        <div className="nav-col nav-left">
          <div className="link-group">
            <a href="#about" className="nav-link">
              About
            </a>
            <a href="#podcast" className="nav-link">
              Podcast
            </a>
            <a href="#guests" className="nav-link ">
              Guests
            </a>
            <a href="#gallery" className="nav-link hide-tablet">
              Gallery
            </a>
            <a href="#words" className="nav-link hide-tablet">
              Words
            </a>
            <a href="#contact" className="nav-link hide-tablet">
              Contact
            </a>
          </div>
        </div>

        {/* 2. CENTER: The Logo */}
        <div className="nav-col nav-center">
          <Link href="/" className="logo">
            NICHEWITHDIKSHYA
          </Link>
        </div>

        {/* 3. RIGHT SIDE: Subscribe Button */}
        <div className="nav-col nav-right">
          <Link href="/admin" className="subscribe-btn">
            Subscribe
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
