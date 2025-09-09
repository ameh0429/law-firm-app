import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminBlogManager() {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/blog/admin/all`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setPosts(data.data || []))
      .catch(err => console.error('Error fetching blog posts:', err));
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this blog post?')) return;
    await fetch(`${API_BASE_URL}/api/blog/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    setPosts(prev => prev.filter(p => p._id !== id));
  };

  return (
    <section className="admin-blog-manager">
  <div className="header">
    <h2>Manage Blog Posts</h2>
    <button className="create-btn" onClick={() => navigate('/admin/blogs/new')}>
      + Create New Blog Post
    </button>
  </div>

  <div className="blog-list">
    {posts.map(post => (
      <div key={post._id} className="blog-card">
        <div className="blog-content">
          <h3 className="blog-title">{post.title}</h3>
          <p className="blog-snippet">{post.content.slice(0, 120)}...</p>
          <p className="blog-date">
            {new Date(post.date).toLocaleDateString('en-NG', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
        <div className="blog-actions">
          <button onClick={() => navigate(`/admin/blogs/edit/${post._id}`)}>Edit</button>
          <button onClick={() => handleDelete(post._id)}>Delete</button>
        </div>
      </div>
    ))}
  </div>
</section>
  );
}

export default AdminBlogManager;