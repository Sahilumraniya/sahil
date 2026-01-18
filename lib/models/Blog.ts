import mongoose, { Schema, model, models } from 'mongoose';

const BlogSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String },
    content: { type: String, required: true },
    tags: [{ type: String }],
    status: { type: String, enum: ['Published', 'Draft', 'Deleted'], default: 'Draft' }, // Added 'Deleted' for Soft Delete
    views: { type: Number, default: 0 },
    readTime: { type: Number, default: 0 }, // Added Read Time (minutes)
    image: { type: String },
    seoDescription: { type: String }
}, { timestamps: true });

export const Blog = models.Blog || model('Blog', BlogSchema);
