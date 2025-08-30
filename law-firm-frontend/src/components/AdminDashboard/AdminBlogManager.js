import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminBlogManager() {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/blog/admin/all', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setPosts(data.data || []))
      .catch(err => console.error('Error fetching blog posts:', err));
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this blog post?')) return;
    await fetch(`http://localhost:5000/api/blog/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    setPosts(prev => prev.filter(p => p._id !== id));
  };

  return (
    // <section className="admin-blog-manager">
    //   <h2>Manage Blog Posts</h2>
    //   <button onClick={() => navigate('/admin/blogs/new')}>
    //     Create New Blog Post
    //   </button>

    //   <div className="blog-grid">
    //     {posts.map(post => (
    //       <div key={post._id} className="blog-card">
    //         <h3>{post.title}</h3>
    //         <p>{post.content.slice(0, 100)}...</p>
    //         <p><em>{new Date(post.date).toLocaleDateString()}</em></p>
    //         <button onClick={() => navigate(`/admin/blogs/edit/${post._id}`)}>Edit</button>
    //         <button onClick={() => handleDelete(post._id)}>Delete</button>
    //       </div>
    //     ))}
    //   </div>
    // </section>

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