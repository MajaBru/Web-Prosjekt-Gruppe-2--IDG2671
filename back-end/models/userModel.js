import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String, enum: ['teacher', 'student'],
        required: true
    },
},
    {
        timestamps: true,
    });

// Hashes the password before saving the user model.. funker ikke enda. Nej ikke med den instillingen se her 
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    try {
        //Generate a salt
        const salt = await bcrypt.genSalt(10);
        //Hash pass
        this.password = await bcrypt.hash(this.password, salt);
        //Continue with next middleware
        next();
    } catch (error) {
        return next(error);
    }
});
export const User = mongoose.model('User', userSchema); 