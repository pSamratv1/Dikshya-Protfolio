import React from "react";

const PodcastSection = () => {
  return (
    <section id="podcast" className="podcast-section">
      <div className="container">
        {/* Header: Editorial Style (Left Title, Right Link) */}
        <div className="podcast-header fade-in-up">
          <div className="header-left">
            <span className="eyebrow">The Podcast</span>
            <h2 className="cursive">Niche with Dikshya</h2>
          </div>
          <div className="header-right">
            <a
              href="https://youtube.com"
              target="_blank"
              className="view-all-link"
            >
              View All Episodes <span className="arrow">→</span>
            </a>
          </div>
        </div>

        {/* The Grid */}
        <div className="episodes-grid">
          {/* Episode Card 1 */}
          <article className="episode-card fade-in-up delay-1">
            <div className="card-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop"
                alt="Episode 38"
              />
              <div className="play-overlay">
                <span className="play-icon">▶</span>
              </div>
            </div>
            <div className="card-content">
              <span className="episode-meta">Episode 38</span>
              <h3>The Art of Intentional Living</h3>
              <p>
                Why slowing down is the fastest way to grow. A conversation on
                mindfulness in business.
              </p>
              <a href="#" className="card-link">
                Listen Now
              </a>
            </div>
          </article>

          {/* Episode Card 2 */}
          <article className="episode-card fade-in-up delay-2">
            <div className="card-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"
                alt="Episode 37"
              />
              <div className="play-overlay">
                <span className="play-icon">▶</span>
              </div>
            </div>
            <div className="card-content">
              <span className="episode-meta">Episode 37</span>
              <h3>Building Your Personal Niche</h3>
              <p>
                How to find clarity in a crowded market and stand out by being
                yourself.
              </p>
              <a href="#" className="card-link">
                Listen Now
              </a>
            </div>
          </article>

          {/* Episode Card 3 */}
          <article className="episode-card fade-in-up delay-3">
            <div className="card-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=800&auto=format&fit=crop"
                alt="Episode 36"
              />
              <div className="play-overlay">
                <span className="play-icon">▶</span>
              </div>
            </div>
            <div className="card-content">
              <span className="episode-meta">Episode 36</span>
              <h3>Networking without the Awkwardness</h3>
              <p>
                Strategies for connecting with high-value individuals
                authentically.
              </p>
              <a href="#" className="card-link">
                Listen Now
              </a>
            </div>
          </article>

          {/* Episode Card 4 */}
          <article className="episode-card fade-in-up delay-4">
            <div className="card-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop"
                alt="Episode 35"
              />
              <div className="play-overlay">
                <span className="play-icon">▶</span>
              </div>
            </div>
            <div className="card-content">
              <span className="episode-meta">Episode 35</span>
              <h3>From Fear to Confidence</h3>
              <p>A solo episode on overcoming imposter syndrome in your 20s.</p>
              <a href="#" className="card-link">
                Listen Now
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default PodcastSection;
