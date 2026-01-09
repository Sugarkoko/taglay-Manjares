import React from 'react';

function AboutPage() {
  return (
    <div className="page">
      <div className="page-header">
        <p className="eyebrow">About</p>
        <h1>Empowering voices through curated content.</h1>
        <p className="lead">
          We're passionate about bringing you insightful articles that inform, inspire, and spark meaningful conversations. Our platform connects readers with diverse perspectives across technology, business, entertainment, and lifestyle.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-card">
          <div className="feature-icon">📚</div>
          <h3>Quality Content</h3>
          <p>
            Every article is carefully curated to ensure you get the most valuable and engaging content. We focus on depth, accuracy, and relevance.
          </p>
        </div>
        <div className="about-card">
          <div className="feature-icon">🌐</div>
          <h3>Diverse Topics</h3>
          <p>
            From cutting-edge technology to lifestyle trends, we cover a wide range of subjects that matter to modern readers.
          </p>
        </div>
        <div className="about-card">
          <div className="feature-icon">✨</div>
          <h3>Reader First</h3>
          <p>
            We prioritize user experience with a clean, intuitive design that makes reading enjoyable and discovering new content effortless.
          </p>
        </div>
      </div>

      <div className="timeline">
        <div className="timeline-row">
          <strong>2024</strong>
          <p>
            Launched with a vision to create a centralized hub for quality articles. Started building our initial content library and community of writers.
          </p>
        </div>
        <div className="timeline-row">
          <strong>2025</strong>
          <p>
            Expanded our categories and grew our reader base significantly. Introduced enhanced features for better content discovery and user engagement.
          </p>
        </div>
        <div className="timeline-row">
          <strong>Today</strong>
          <p>
            Continuing to innovate and evolve. We're committed to bringing you the best reading experience with fresh content updated regularly across all categories.
          </p>
        </div>
      </div>

      <div className="cta-banner">
        <h3>Join our community.</h3>
        <p>
          Stay updated with the latest articles, insights, and trends. Explore our growing collection of content that keeps you informed and inspired.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
