import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function BlogList() {
  const [posts, setPosts] = useState([]);
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/blog`)
      .then(res => res.json())
      .then(data => setPosts(data.data || []))
      .catch(err => console.error('Error fetching blogs:', err));
  }, []);

  return (
    <section className="blog-section">
  <h2 className="section-title">Latest Blog Posts</h2>
  <div className="blog-grid">
    {posts.map(post => (
      <div key={post._id} className="blog-card">
        <div className="blog-header">
          <h3 className="blog-title">{post.title}</h3>
          <p className="blog-date">
            {new Date(post.date).toLocaleDateString('en-NG', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
        <p className="blog-author"><strong>By:</strong> {post.author}</p>
        <p className="blog-snippet">{post.content.slice(0, 120)}...</p>
        <Link to={`/blog/${post._id}`} className="read-more-btn">
          Read More
        </Link>
      </div>
    ))}
  </div>
</section>
  );
}

export default BlogList;