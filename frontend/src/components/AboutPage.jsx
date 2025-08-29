import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content">
          <h1>About LuxeScent</h1>
          <p>Discover the story behind the world's finest fragrance collection</p>
        </div>
      </div>

      <div className="container">
        <section className="about-section">
          <div className="about-content">
            <div className="about-text">
              <h2>Our Story</h2>
              <p>
                Founded in 2010, LuxeScent began with a simple mission: to bring the world's most exquisite fragrances to discerning customers who appreciate the art of perfumery. What started as a small boutique in Paris has grown into a global destination for luxury scents, while maintaining our commitment to quality, authenticity, and personalized service.
              </p>
              <p>
                Our founder, Isabella Laurent, a perfume connoisseur with over 20 years of experience in the fragrance industry, personally curates our collection, ensuring that each scent meets our rigorous standards of excellence.
              </p>
            </div>
            <div className="about-image">
              <img src="/PICTURES/pexels-mareefe-932577.jpg" alt="Our boutique" />
            </div>
          </div>
        </section>

        <section className="values-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">✨</div>
              <h3>Quality</h3>
              <p>We partner exclusively with the world's most prestigious perfume houses and artisanal creators who share our commitment to excellence.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌿</div>
              <h3>Sustainability</h3>
              <p>We are committed to ethical sourcing and environmentally responsible practices throughout our supply chain.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Service</h3>
              <p>Our fragrance experts provide personalized consultations to help you discover your signature scent.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🔍</div>
              <h3>Authenticity</h3>
              <p>We guarantee the authenticity of every product, offering only genuine fragrances from original manufacturers.</p>
            </div>
          </div>
        </section>

        <section className="team-section">
          <h2>Our Expert Team</h2>
          <p className="section-subtitle">Meet the passionate perfume connoisseurs behind LuxeScent</p>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-image">
                <img src="/PICTURES/pexels-valeriya-1961791.jpg" alt="Team member" />
              </div>
              <h3>Isabella Laurent</h3>
              <p className="member-title">Founder & Chief Curator</p>
              <p className="member-bio">With over 20 years in the fragrance industry, Isabella's exceptional nose and passion for perfumery guide our collection.</p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <img src="/PICTURES/pexels-valeriya-1961792.jpg" alt="Team member" />
              </div>
              <h3>Alexandre Dubois</h3>
              <p className="member-title">Master Perfumer</p>
              <p className="member-bio">Trained in Grasse, France, Alexandre brings his expertise in fragrance composition and evaluation to our team.</p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <img src="/PICTURES/pexels-pixabay-264950.jpg" alt="Team member" />
              </div>
              <h3>Sophia Chen</h3>
              <p className="member-title">Fragrance Consultant</p>
              <p className="member-bio">Sophia's exceptional ability to match customers with their perfect scent has made her an invaluable part of our team.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;