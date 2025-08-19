// models/Team.js
import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  specialty: {
    type: String,
    required: [true, 'Specialty is required'],
    trim: true,
    maxlength: [100, 'Specialty cannot exceed 100 characters']
  },
  bio: {
    type: String,
    required: [true, 'Bio is required'],
    trim: true,
    maxlength: [1000, 'Bio cannot exceed 1000 characters']
  },
  photoUrl: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/.+/.test(v);
      },
      message: 'Photo URL must be a valid HTTP/HTTPS URL'
    }
  }
}, {
  timestamps: true
});

export default mongoose.model('Team', teamSchema);