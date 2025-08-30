import React from 'react';
import BlogEditor from './BlogEditor';

function AdminBlogEditorPage() {
  return (
    <section className="admin-blog-editor">
      <h2>Create Blog Post</h2>
      <BlogEditor post={null} onSave={() => window.history.back()} />
    </section>
  );
}

export default AdminBlogEditorPage;