import React, { useState } from 'react';

function BlogEditor({ post, onSave }) {
  const [form, setForm] = useState(post || {
    title: '', content: '', author: '', published: true, tags: []
  });
  const token = localStorage.getItem('token');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const method = post ? 'PUT' : 'POST';
    const url = post
      ? `http://localhost:5000/api/blog/${post._id}`
      : 'http://localhost:5000/api/blog';

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    });

    const result = await res.json();
    if (result.success) {
      alert('Saved successfully');
      onSave();
    } else {
      alert(result.message || 'Error saving post');
    }
  };

   return (
    <form onSubmit={handleSubmit} className="blog-editor">
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder="Content"
        required
      />
      <input
        name="author"
        value={form.author}
        onChange={handleChange}
        placeholder="Author"
        required
      />
      <label>
        <input
          type="checkbox"
          checked={form.published}
          onChange={() =>
            setForm(prev => ({ ...prev, published: !prev.published }))
          }
        />
        Published
      </label>
      <button type="submit">Save</button>
    </form>
  );
}

export default BlogEditor;