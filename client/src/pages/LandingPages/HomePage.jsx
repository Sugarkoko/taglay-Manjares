import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const [articles, setArticles] = useState([]);
  const [featuredArticles, setFeaturedArticles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/articles')
      .then(res => res.json())
      .then(data => {
        const articlesList = data.articles || data;
        setArticles(articlesList);
        setFeaturedArticles(articlesList.slice(0, 3));
      })
      .catch(err => console.error('Error fetching articles:', err));
  }, []);

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Article Hub</p>
          <h1>Articles for your daily read.</h1>
          <p className="lead">
            Discover engaging stories, insights, and perspectives from writers around the world. From entertainment to technology, find content that inspires and informs.
          </p>
          <div className="hero-actions">
            <Link to="/articles" className="button-link primary">
              Browse articles
            </Link>
            <Link to="/about" className="button-link secondary">
              About the team
            </Link>
          </div>
          <div className="stats">
            <div className="stat">
              <strong>{articles.length}+</strong>
              <span>Articles</span>
            </div>
            <div className="stat">
              <strong>3+</strong>
              <span>Users</span>
            </div>
            <div className="stat">
              <strong>4</strong>
              <span>Categories</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-panel">
            <img
              src="https://media.licdn.com/dms/image/v2/C5112AQHyTivjkijUAg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1533804257780?e=2147483647&v=beta&t=iHBq7iyRl4h07KSszls8TpCujE45XPFMkyqgt5Z-FA8"
              alt="Design desk with colorful UI elements"
            />
            <p className="muted">
              Stay informed with carefully curated articles spanning multiple topics and perspectives.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Highlights</p>
            <h2>What you get inside.</h2>
          </div>
          <span className="muted">Different categories you can choose from.</span>
        </div>
        <div className="feature-grid">
          <div className="feature-card">
            <img
              src="https://t3.ftcdn.net/jpg/02/85/90/44/360_F_285904463_52tKiXp592qUhmg24eS3f4k1kGQSji3f.jpg"
              alt="Entertainment"
            />
            <h3>Entertainment</h3>
            <p>
              Explore the latest in movies, music, TV shows, and pop culture. Stay updated on celebrity news and trending entertainment stories.
            </p>
          </div>
          <div className="feature-card">
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
              alt="Business & Growth"
            />
            <h3>Business & Growth</h3>
            <p>
              Gain insights into entrepreneurship, career development, and business strategies. Learn from success stories and industry leaders.
            </p>
          </div>
          <div className="feature-card">
            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
              alt="Tech & Future"
            />
            <h3>Tech & Future</h3>
            <p>
              Dive into emerging technologies, innovation, and digital transformation. Discover how technology shapes our tomorrow.
            </p>
          </div>
        </div>
      </section>

      <section className="articles-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Articles</p>
            <h2>Latest reads.</h2>
          </div>
          <Link to="/articles" className="button-link secondary">
            View all
          </Link>
        </div>
        <div className="article-preview-grid">
          {featuredArticles.map((article) => (
            <div key={article.name} className="article-preview">
              {article.image && (
                <img src={article.image} alt={article.title} className="article-preview-image" />
              )}
              <div className="article-meta">
                <span className="pill">{article.category}</span>
                <span className="muted">5 min read</span>
              </div>
              <h3>{article.title}</h3>
              <p>{article.content[0].substring(0, 120)}...</p>
              <Link to={`/articles/${article.name}`} className="button-link secondary">
                Read article
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
