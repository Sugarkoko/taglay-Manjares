import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage.jsx';

function ArticlePage() {
  const { name } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch article from API
    fetch(`http://localhost:8000/api/articles/${name}`)
      .then(res => {
        if (!res.ok) throw new Error('Article not found');
        return res.json();
      })
      .then(data => {
        setArticle(data.article || data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching article:', err);
        setArticle(null);
        setLoading(false);
      });
  }, [name]);

  if (loading) {
    return <div className="page">Loading...</div>;
  }

  if (!article) {
    return <NotFoundPage />;
  }

  const contentArray = Array.isArray(article.content)
    ? article.content
    : article.content
      ? [article.content]
      : [];

  const words = contentArray.join(' ').split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(2, Math.ceil(words / 200));

  return (
    <div className="page article-page">
      {article.image && (
        <div className="article-hero-image">
          <img src={article.image} alt={article.title} />
        </div>
      )}
      <div className="page-header">
        <p className="eyebrow">{article.category || 'Article'}</p>
        <h1>{article.title}</h1>
        <div className="article-meta">
          <span className="pill">{article.category || 'General'}</span>
          <span className="muted">{minutes} min read</span>
        </div>
      </div>

      <div className="article-body">
        {contentArray.map((paragraph, idx) => (
          <p key={`${article.name}-${idx}`}>{paragraph}</p>
        ))}
        <div className="card callout">
          <h3>Want to read more?</h3>
          <p>
            Explore more articles across different categories and discover fresh perspectives on topics that matter to you.
          </p>
          <Link to="/articles" className="button-link primary">
            Browse more articles
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ArticlePage;
