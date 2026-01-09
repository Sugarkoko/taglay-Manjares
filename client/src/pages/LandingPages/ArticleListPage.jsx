import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ArticleList from '../../components/ArticleList';

function ArticleListPage() {
  const [articleList, setArticleList] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('title');
  const [categories, setCategories] = useState(['All']);

  // Fetch articles from API
  useEffect(() => {
    fetch('http://localhost:8000/api/articles')
      .then(res => res.json())
      .then(data => {
        const articlesList = data.articles || data;
        setArticleList(articlesList);
        setFilteredArticles(articlesList);
        // Get unique categories
        const uniqueCategories = ['All', ...new Set(articlesList.map(article => article.category))];
        setCategories(uniqueCategories);
      })
      .catch(err => console.error('Error fetching articles:', err));
  }, []);

  useEffect(() => {
    let result = [...articleList];

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(article => article.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(article => 
        article.title.toLowerCase().includes(query) ||
        article.content.some(paragraph => paragraph.toLowerCase().includes(query)) ||
        article.category.toLowerCase().includes(query)
      );
    }

    // Sort articles
    result.sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'category') {
        return a.category.localeCompare(b.category);
      }
      return 0;
    });

    setFilteredArticles(result);
  }, [searchQuery, selectedCategory, sortBy, articleList]);

  return (
    <div className="page">
      <div className="article-page-header">
        <div className="page-header">
          <p className="eyebrow">Library</p>
          <h1>Explore Our Collection of Articles</h1>
          <p className="lead">
            Discover insights, stories, and perspectives across entertainment, business, technology, and lifestyle topics.
          </p>
        </div>

        <div className="article-filters">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-controls">
            <div className="filter-group">
              <label htmlFor="category-filter">Category:</label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="sort-filter">Sort by:</label>
              <select
                id="sort-filter"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="title">Title (A-Z)</option>
                <option value="category">Category</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {(searchQuery || selectedCategory !== 'All') && (
        <div className="filter-status">
          <p className="muted">
            Showing {filteredArticles.length} of {articleList.length} articles
            {searchQuery && ` matching "${searchQuery}"`}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </p>
          <button 
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="button-link secondary"
            style={{ padding: '8px 12px', fontSize: '0.9rem' }}
          >
            Clear filters
          </button>
        </div>
      )}

      {filteredArticles.length > 0 ? (
        <ArticleList articles={filteredArticles} />
      ) : (
        <div className="no-results">
          <p className="muted">No articles found matching your criteria.</p>
          <button 
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="button-link primary"
          >
            Clear filters
          </button>
        </div>
      )}

      <div className="cta-banner">
        <h3>Looking for more?</h3>
        <p>
          Subscribe to our newsletter to get the latest articles delivered straight to your inbox every week.
        </p>
        <Link to="/about" className="button-link secondary">
          Meet the team
        </Link>
      </div>
    </div>
  );
}

export default ArticleListPage;
