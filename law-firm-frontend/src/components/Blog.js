// components/Blog.js
import React from 'react';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    id: 'corporate-law-basics',
    title: 'Corporate Law Basics',
    date: 'July 15, 2025',
    snippet: 'Understanding the legal framework that governs businesses...',
    content: 'Corporate law governs the formation, operation, and dissolution of corporations. It includes regulations on mergers, acquisitions, shareholder rights, and compliance.'
  },
  {
    id: 'family-law-guide',
    title: 'A Guide to Family Law',
    date: 'July 15, 2025',
    snippet: 'Navigating divorce, custody, and family disputes with clarity...',
    content: 'Family law deals with legal issues involving relationships, including divorce, child custody, adoption, and domestic violence. It requires sensitivity and strategic planning.'
  }
];

function Blog() {
  return (
    <section className="section blog">
      <h2>Legal Insights</h2>
      {blogPosts.map(post => (
        <div key={post.id} className="blog-preview">
          <h3>{post.title}</h3>
          <p className="blog-date">{post.date}</p>
          <p>{post.snippet}</p>
          <Link to={`/blog/${post.id}`}>
            <button className="read-button">Read More</button>
          </Link>
        </div>
      ))}
    </section>
  );
}

export default Blog;