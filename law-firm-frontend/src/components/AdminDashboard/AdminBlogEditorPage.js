import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BlogEditor from './BlogEditor';

function AdminBlogEditorPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:5000/api/blog/${id}`)
      .then(res => res.json())
      .then(data => {
        setPost(data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading blog post:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading editor...</p>;

  return (
    <section className="admin-blog-editor">
      <h2>{id ? 'Edit Blog Post' : 'Create Blog Post'}</h2>
      <BlogEditor post={post} onSave={() => window.history.back()} />
    </section>
  );
}

export default AdminBlogEditorPage;