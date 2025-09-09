import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (!id) return;
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  fetch(`${API_BASE_URL}/api/blog/${id}`)
    .then(res => res.json())
    .then(data => {
      console.log('Fetched blog post:', data);
      if (data.success && data.data) {
        setPost(data.data);
      } else {
        console.warn('Unexpected response format:', data);
        setPost(null);
      }
      setLoading(false);
    })
    .catch(err => {
      console.error('Error fetching post:', err);
      setLoading(false);
    });
}, [id]);

  if (loading) return <p>Loading blog post...</p>;
  if (!post || !post.title) return <p>Blog post not found.</p>;


  return (
   <article className="blog-post">
  <h2>{post.title}</h2>
  <p>
    <em>
      {new Date(post.date).toLocaleDateString('en-NG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}
    </em>
    {' '} | <strong>Author:</strong> {post.author}
  </p>
  <div>{post.content.split('\n\n').map((para, index) =>(<p key = {index}>{para}</p>))}</div>
</article>
  );
}

export default BlogPost;