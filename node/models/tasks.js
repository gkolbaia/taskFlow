const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const TaskSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    deadLine: {
        type: Date,
        required: true
    },
    staffNeeded: {
        type: Number,
        required: true
    },
    steps: {
        type: Number,
        default: 1,
    }
});
mongoose.model('tasks', TaskSchema);