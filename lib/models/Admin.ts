import mongoose, { Schema, model, models } from 'mongoose';

const AdminSchema = new Schema({
    email: { type: String, required: true, unique: true },
    otp: {
        code: { type: String }, // Hashed OTP or plain (hashed recommended but plain for simple demo if needed)
        expiresAt: { type: Date }
    }
}, { timestamps: true });

export const Admin = models.Admin || model('Admin', AdminSchema);
