"use client";

const Header = () => {
  return (
    <nav className="editorial-nav">
      <div className="nav-group nav-left">
        <a href="#about" className="nav-link">
          About
        </a>
        <a href="#podcast" className="nav-link">
          Podcast
        </a>
        <a href="#guests" className="nav-link">
          Guests
        </a>
        <a href="#gallery" className="nav-link">
          Gallery
        </a>
        <a href="#testimonials" className="nav-link">
          Testimonials
        </a>
        <a href="#contact" className="nav-link">
          Contact
        </a>
      </div>
      <div className="nav-center">
        <a href="#" className="logo">
          NicheWithDikshya
        </a>
      </div>
      <div className="nav-group nav-right">
        <a href="#" className="nav-link">
          Subscribe
        </a>
      </div>
    </nav>
  );
};

export default Header;
