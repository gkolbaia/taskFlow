const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const StaffSchema = new Schema({
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
    imagePath: String
});
mongoose.model('staff', StaffSchema)