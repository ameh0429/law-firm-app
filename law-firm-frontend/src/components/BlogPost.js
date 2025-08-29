// components/BlogPost.js
import React from 'react';
import { useParams } from 'react-router-dom';

const blogPosts = {
  'corporate-law-basics': {
    title: 'Corporate Law Basics',
    date: 'July 15, 2025',
    content: 'Corporate law governs the formation, operation, and dissolution of corporations. It includes regulations on mergers, acquisitions, shareholder rights, and compliance.'
  },
  'family-law-guide': {
    title: 'A Guide to Family Law',
    date: 'July 15, 2025',
    content: 'Family law deals with legal issues involving relationships, including divorce, child custody, adoption, and domestic violence. It requires sensitivity and strategic planning.'
  }
};

function BlogPost() {
  const { postId } = useParams();
  const post = blogPosts[postId];

  if (!post) return <p>Blog post not found.</p>;

  return (
    <div className="blog-post">
      <h2>{post.title}</h2>
      <p className="blog-date">{post.date}</p>
      <p>{post.content}</p>
    </div>
  );
}

export default BlogPost;