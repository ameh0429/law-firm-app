// // components/Blog.js
// import React from 'react';
// import { Link } from 'react-router-dom';

// const blogPosts = [
//   {
//     id: 'corporate-law-basics',
//     title: 'Corporate Law Basics',
//     date: 'July 15, 2025',
//     snippet: 'Understanding the legal framework that governs businesses...',
//     content: 'Corporate law governs the formation, operation, and dissolution of corporations. It includes regulations on mergers, acquisitions, shareholder rights, and compliance.'
//   },
//   {
//     id: 'family-law-guide',
//     title: 'A Guide to Family Law',
//     date: 'July 15, 2025',
//     snippet: 'Navigating divorce, custody, and family disputes with clarity...',
//     content: 'Family law deals with legal issues involving relationships, including divorce, child custody, adoption, and domestic violence. It requires sensitivity and strategic planning.'
//   }
// ];

// function Blog() {
//   return (
//     <section className="section blog">
//       <h2>Legal Insights</h2>
//       {blogPosts.map(post => (
//         <div key={post.id} className="blog-preview">
//           <h3>{post.title}</h3>
//           <p className="blog-date">{post.date}</p>
//           <p>{post.snippet}</p>
//           <Link to={`/blog/${post.id}`}>
//             <button className="read-button">Read More</button>
//           </Link>
//         </div>
//       ))}
//     </section>
//   );
// }

// export default Blog;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function BlogList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/blog')
      .then(res => res.json())
      .then(data => setPosts(data.data || []))
      .catch(err => console.error('Error fetching blogs:', err));
  }, []);

  return (
    // <section className="blog-list">
    //   <h2>Latest Blog Posts</h2>
    //   {posts.map(post => (
    //     <div key={post._id} className="blog-card">
    //       <h3>{post.title}</h3>
    //       <p>{post.content.slice(0, 150)}...</p>
    //       <Link to={`/blog/${post._id}`}>Read More</Link>
    //     </div>
    //   ))}
    // </section>

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