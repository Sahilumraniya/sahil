import mongoose, { Schema, model, models } from 'mongoose';

const TagSchema = new Schema({
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
}, { timestamps: true });

export const Tag = models.Tag || model('Tag', TagSchema);
