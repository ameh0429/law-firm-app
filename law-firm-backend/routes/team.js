// routes/team.js
import express from 'express';
import Team from '../models/Team.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET all team members (public)
router.get('/', async (req, res) => {
  try {
    const teamMembers = await Team.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: teamMembers,
      count: teamMembers.length
    });
  } catch (error) {
    console.error('Error fetching team members:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching team members'
    });
  }
});

// GET single team member (public)
router.get('/:id', async (req, res) => {
  try {
    const teamMember = await Team.findById(req.params.id);
    
    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    res.json({
      success: true,
      data: teamMember
    });
  } catch (error) {
    console.error('Error fetching team member:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid team member ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error fetching team member'
    });
  }
});

// POST create team member (admin only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, position, bio, photoUrl } = req.body;

    const teamMember = new Team({
      name,
      position,
      bio,
      photoUrl
    });

    const savedTeamMember = await teamMember.save();
    
    res.status(201).json({
      success: true,
      message: 'Team member created successfully',
      data: savedTeamMember
    });
  } catch (error) {
    console.error('Error creating team member:', error);
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
      message: 'Error creating team member'
    });
  }
});

// PUT update team member (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { name, position, bio, photoUrl } = req.body;

    const updatedTeamMember = await Team.findByIdAndUpdate(
      req.params.id,
      { name, position, bio, photoUrl },
      { new: true, runValidators: true }
    );

    if (!updatedTeamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    res.json({
      success: true,
      message: 'Team member updated successfully',
      data: updatedTeamMember
    });
  } catch (error) {
    console.error('Error updating team member:', error);
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
        message: 'Invalid team member ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error updating team member'
    });
  }
});

// DELETE team member (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deletedTeamMember = await Team.findByIdAndDelete(req.params.id);

    if (!deletedTeamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    res.json({
      success: true,
      message: 'Team member deleted successfully',
      data: deletedTeamMember
    });
  } catch (error) {
    console.error('Error deleting team member:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid team member ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error deleting team member'
    });
  }
});

export default router;
