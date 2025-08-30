import React, { useEffect, useState } from 'react';
import BlogEditor from './BlogEditor'; // Make sure this path is correct

function AdminBlogList() {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const token = localStorage.getItem('token');

  const fetchPosts = () => {
    fetch('http://localhost:5000/api/blog/admin/all', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setPosts(data.data || []))
      .catch(err => console.error('Error fetching admin blogs:', err));
  };

  useEffect(() => {
    fetchPosts();
  });

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    await fetch(`http://localhost:5000/api/blog/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    setPosts(prev => prev.filter(p => p._id !== id));
  };

  const handleSave = () => {
    setEditingPost(null);
    fetchPosts(); // Refresh list after save
  };

  return (
    <section className="admin-blog-list">
      <h2>Manage Blog Posts</h2>

      {editingPost !== null ? (
        <BlogEditor post={editingPost} onSave={handleSave} />
      ) : (
        <>
          <button onClick={() => setEditingPost({})}>Create New Blog</button>
          <div className="blog-grid">
            {posts.map(post => (
              <div key={post._id} className="blog-card">
                <h3>{post.title}</h3>
                <button onClick={() => setEditingPost(post)}>Edit</button>
                <button onClick={() => handleDelete(post._id)}>Delete</button>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default AdminBlogList;