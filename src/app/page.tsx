export default function HomePage() {
  return (
    <>
      <nav>
        <div className="nav-left">
          <a href="#about" className="nav-link">
            About
          </a>
          <a href="#podcast" className="nav-link">
            Podcast
          </a>
          <a href="#values" className="nav-link">
            Values
          </a>
          <a href="#contact" className="nav-link">
            Contact
          </a>
        </div>

        <div className="nav-center">
          <a href="#" className="logo">
            DIKSHYA LIMBU
          </a>
        </div>

        <div className="nav-right">
          <a href="#subscribe" className="nav-link nav-text-item">
            Subscribe
          </a>
        </div>
      </nav>

      <section className="hero-video-wrapper">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="bg-video"
        >
          <source src="/201676-916080496.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="video-overlay"></div>

        <div className="hero-container-animated">
          <span className="eyebrow-hero">The Portfolio</span>
          <h1>
            Find Your Niche.
            <br />
            Build with Intention.
          </h1>
          <p>
            Entrepreneur, podcast host, and connector sharing stories of
            mindset, growth, and purpose from voices around the world.
          </p>

          <a href="#about" className="cta-link-white">
            Explore the Journey
          </a>
        </div>
      </section>

      <section id="about">
        <div className="container about-grid">
          <div>
            <span className="eyebrow">About Dikshya</span>
            <h2>Confidence comes from Clarity.</h2>
            <p>
              I’m Dikshya Limbu — an entrepreneur and podcast host driven by
              meaningful conversations and intentional growth.
            </p>
            <p>
              Through business, networking, and media, I connect people with
              ideas, opportunities, and perspectives that challenge how we think
              about success.
            </p>
          </div>

          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb"
              alt="Dikshya Limbu"
            />
          </div>
        </div>
      </section>

      <section id="podcast" className="podcast">
        <div className="container podcast-content">
          <span className="eyebrow">The Podcast</span>
          <h2>Niche with Dikshya</h2>
          <p>
            A podcast built around honest conversations with entrepreneurs,
            leaders, athletes, and change-makers from around the world.
          </p>
          <a href="#" className="cta-link">
            Listen on YouTube
          </a>
        </div>
      </section>

      <section id="values">
        <div className="container">
          <span className="eyebrow">Philosophy</span>
          <h2>What I Stand For</h2>
          <div className="values-grid">
            <div className="value-item">
              <h3>Clarity</h3>
              <p>Cutting through the noise to find what truly matters.</p>
            </div>
            <div className="value-item">
              <h3>Growth</h3>
              <p>Evolution happens through connection and listening.</p>
            </div>
            <div className="value-item">
              <h3>Purpose</h3>
              <p>
                Confidence built on the quiet certainty of knowing your why.
              </p>
            </div>
            <div className="value-item">
              <h3>Impact</h3>
              <p>Conversations that move the needle. Quality over quantity.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="container">
          <span className="eyebrow">Get in Touch</span>
          <h2>Let’s Connect</h2>
          <p>
            Whether it’s a conversation, collaboration, or shared idea — I’m
            always open to meaningful connections.
          </p>
          <a href="mailto:hello@dikshyalimbu.com" className="cta-link">
            Send an Email
          </a>
        </div>
      </section>

      <footer>
        <div>© Dikshya Limbu</div>
        <div className="social-links">
          <a href="#">YouTube</a>
          <a href="#">LinkedIn</a>
          <a href="#">TikTok</a>
        </div>
      </footer>
    </>
  );
}
