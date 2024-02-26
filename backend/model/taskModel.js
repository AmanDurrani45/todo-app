import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    isCompleted: {
        type: Boolean,
        require: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

export default mongoose.model('Tasks', taskSchema, 'tasks');