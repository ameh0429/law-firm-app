import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:5000/api/blog/${id}`)
      .then(res => res.json())
      // .then(data => setPost(data.data))
      .then(data => {
        setPost(data.data);
        setLoading(false);
      })

      .catch(err => console.error('Error fetching post:', err));
  }, [id]);

  // if (!post) return <p>Loading...</p>;

   if (loading) return <p>Loading blog post...</p>;
  if (!post) return <p>Blog post not found.</p>;


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
  <div>{post.content}</div>
</article>
  );
}

export default BlogPost;