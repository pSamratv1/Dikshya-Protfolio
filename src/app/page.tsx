import AboutSection from "@/components/AboutSection";
import HeroAnimation from "@/components/HeroAnimation";
import PodcastSection from "@/components/PodcastSection";

export default function HomePage() {
  return (
    <>
      <HeroAnimation />

      <AboutSection />

      <PodcastSection />

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
