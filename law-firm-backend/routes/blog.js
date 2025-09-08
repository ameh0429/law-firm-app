// routes/blog.js
import express from 'express';
import mongoose from 'mongoose';
import BlogPost from '../models/BlogPost.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET all blog posts (public) - with pagination and search
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search;
    const published = req.query.published !== 'false'; // Default to true

    let query = { published };

    // Add search functionality
    if (search) {
      query.$text = { $search: search };
    }

    const skip = (page - 1) * limit;

    let blogQuery = BlogPost.find(query)
      .sort({ date: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Add text score for search results
    if (search) {
      blogQuery = blogQuery.select({ score: { $meta: 'textScore' } })
        .sort({ score: { $meta: 'textScore' } });
    }

    const blogPosts = await blogQuery.exec();
    const total = await BlogPost.countDocuments(query);

    res.json({
      success: true,
      data: blogPosts,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        count: blogPosts.length,
        total
      }
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blog posts'
    });
  }
});

// GET single blog post (public)
router.get('/:id', async (req, res) => {

   // Validate ID format before querying
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
  return res.status(400).json({
    success: false,
    message: 'Invalid blog post ID'
  });
}

  try {
    const blogPost = await BlogPost.findById(id);
    
    if (!blogPost) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Only show published posts to public (unless admin is requesting)
    const authHeader = req.header('Authorization');
    const isAdmin = authHeader && authHeader.startsWith('Bearer ');
    
    if (!blogPost.published && !isAdmin) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    res.json({
      success: true,
      data: blogPost
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid blog post ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error fetching blog post'
    });
  }
});

// POST create blog post (admin only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, content, author, date, published, tags } = req.body;

    const blogPost = new BlogPost({
      title,
      content,
      author,
      date: date || new Date(),
      published: published !== undefined ? published : true,
      tags: tags || []
    });

    const savedBlogPost = await blogPost.save();
    
    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: savedBlogPost
    });
  } catch (error) {
    console.error('Error creating blog post:', error);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error creating blog post'
    });
  }
});

// PUT update blog post (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { title, content, author, date, published, tags } = req.body;

    const updatedBlogPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      { 
        title, 
        content, 
        author, 
        date: date || new Date(), 
        published: published !== undefined ? published : true,
        tags: tags || []
      },
      { new: true, runValidators: true }
    );

    if (!updatedBlogPost) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    res.json({
      success: true,
      message: 'Blog post updated successfully',
      data: updatedBlogPost
    });
  } catch (error) {
    console.error('Error updating blog post:', error);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid blog post ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error updating blog post'
    });
  }
});

// DELETE blog post (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deletedBlogPost = await BlogPost.findByIdAndDelete(req.params.id);

    if (!deletedBlogPost) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    res.json({
      success: true,
      message: 'Blog post deleted successfully',
      data: deletedBlogPost
    });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid blog post ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error deleting blog post'
    });
  }
});

// GET blog posts for admin (includes unpublished)
router.get('/admin/all', authMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search;

    let query = {};

    if (search) {
      query.$text = { $search: search };
    }

    const skip = (page - 1) * limit;

    let blogQuery = BlogPost.find(query)
      .sort({ date: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    if (search) {
      blogQuery = blogQuery.select({ score: { $meta: 'textScore' } })
        .sort({ score: { $meta: 'textScore' } });
    }

    const blogPosts = await blogQuery.exec();
    const total = await BlogPost.countDocuments(query);

    res.json({
      success: true,
      data: blogPosts,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        count: blogPosts.length,
        total
      }
    });
  } catch (error) {
    console.error('Error fetching admin blog posts:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blog posts'
    });
  }
});

export default router;