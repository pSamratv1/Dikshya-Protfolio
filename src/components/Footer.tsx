"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="container">
        <div className="footer-card">
          {/* 1. TOP SECTION: Lines & Logo */}
          <div className="footer-header">
            <div className="header-line"></div>
            <div className="footer-logo">
              <span className="logo-main">DIKSHYA</span>
              <span className="logo-sub">LIMBU</span>
            </div>
            <div className="header-line"></div>
          </div>

          {/* 2. MAIN GRID */}
          <div className="footer-content">
            {/* LEFT LINKS */}
            <div className="footer-col left-col">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms & Conditions</a>
              <a href="#about">About</a>
            </div>

            {/* CENTER: Socials -> Line -> Newsletter */}
            <div className="footer-col center-col">
              {/* Social Icons */}
              <div className="social-icons">
                <a href="#" aria-label="Twitter">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" aria-label="Pinterest">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0c-6.627 0-12 5.373-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.992 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.65 0-5.789 2.737-5.789 5.563 0 1.103.425 2.286.953 2.922.105.126.12.235.089.358-.097.408-.316 1.287-.358 1.467-.058.246-.192.298-.442.18-1.646-.769-2.671-3.179-2.671-5.12 0-4.164 3.03-8.036 8.741-8.036 4.59 0 8.156 3.272 8.156 7.643 0 4.562-2.875 8.249-6.866 8.249-1.34 0-2.602-.697-3.033-1.517l-.824 3.141c-.297 1.134-1.1 2.553-1.638 3.42 1.233.366 2.536.565 3.885.565 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a href="#" aria-label="Instagram">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>

              {/* Vertical Divider */}
              <div className="vertical-line"></div>

              {/* Newsletter Form */}
              {/* <div className="newsletter-block">
                <span className="newsletter-label">Weekly Newsletter</span>
                <form className="newsletter-form">
                  <input type="email" placeholder="NAME@EMAIL.COM" required />
                  <button type="submit">SUBSCRIBE</button>
                </form>
              </div> */}
            </div>

            {/* RIGHT LINKS */}
            <div className="footer-col right-col">
              <a href="#podcast">Podcast Info</a>
              <a href="#gallery">Press / Media</a>
              <a href="#contact">Contact</a>
            </div>
          </div>

          {/* 3. COPYRIGHT */}
          <div className="footer-bottom">© {new Date().getFullYear()}</div>
        </div>
      </div>
    </footer>
  );
}
