import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ArticleList.css';

function ArticleList({ articles }) {
  return (
    <div className="article-list">
      {articles.map((article) => {
        const words = article.content.join(' ').split(' ').length;
        const minutes = Math.max(2, Math.ceil(words / 200));

        return (
          <Link
            key={article.name}
            to={`/articles/${article.name}`}
            className="article-card"
          >
            {article.image && (
              <img src={article.image} alt={article.title} className="article-card-image" />
            )}
            <div className="article-card-content">
              <div className="article-card__meta">
                <span className="pill">{article.category || 'Article'}</span>
                <span className="muted">{minutes} min read</span>
              </div>
              <h3>{article.title}</h3>
              <p>{article.content[0].substring(0, 120)}...</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default ArticleList;
