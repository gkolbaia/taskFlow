import * as mongoose from 'mongoose';
export const StaffSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    regiterDate: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: false
    }
});