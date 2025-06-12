import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: 150,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    author: {
      type: String, 
      required: [true, 'author is required'],
    },
    category: {
      type: String,
      enum: ['Tech', 'Lifestyle', 'Business', 'Education', 'Other'],
      default: 'Other',
    },
    image: { type: String, required: true ,

    },
    tags: {
      type: [String],
      default: [],
    },
   
  },
  {
    timestamps: true, 
  }
);
export const Blog = mongoose.model('Blog', blogSchema);

