import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

function BlogList() {
  const [posts, setPosts] = useState([]);
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  const { ref: bannerRef, inView: bannerInView } = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/blog`)
      .then(res => res.json())
      .then(data => setPosts(data.data || []))
      .catch(err => console.error('Error fetching blogs:', err));
  }, []);

  return (
    <section className="blog-section" style={{ margin: 0, padding: 0 }}>
      {/* 🔹 Animated Banner Image with Overlay Text */}
      <div
        ref={bannerRef}
        style={{
          width: '100vw',
          height: '350px',
          overflow: 'hidden',
          position: 'relative',
          opacity: bannerInView ? 1 : 0,
          transform: bannerInView ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 1s ease-out',
        }}
      >
        <img
          src="/images/blog.jpg"
          alt="Blog Banner"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            animation: 'zoomInOut 12s ease-in-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#fff',
            fontSize: '48px',
            fontWeight: 'bold',
            textShadow: '2px 2px 8px rgba(0,0,0,0.6)',
            animation: 'pulseText 2s ease-in-out infinite',
            zIndex: 2,
          }}
        >
          Blog
        </div>
      </div>

      {/* 🔹 Blog Posts */}
      <div style={{ padding: '40px 20px' }}>
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
      </div>

      {/* 🔹 Animation Styles */}
      <style>
        {`
          @keyframes pulseText {
            0% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-50%, -50%) scale(1.05); }
            100% { transform: translate(-50%, -50%) scale(1); }
          }

          @keyframes zoomInOut {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </section>
  );
}

export default BlogList;