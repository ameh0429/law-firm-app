import React from 'react';

const posts = [
  {
    title: 'Understanding Corporate Law',
    content: 'Corporate law governs business and commercial transactions...'
  },
  {
    title: 'Family Law Tips',
    content: 'Navigating divorce and custody requires compassion and clarity...'
  }
];

function Blog() {
  return (
    <section className="section">
      <h2>Legal Insights</h2>
      {posts.map((post, index) => (
        <div key={index} className="blog-post">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </section>
  );
}

export default Blog;