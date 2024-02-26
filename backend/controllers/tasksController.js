import '../db/conn.js';
import taskModel from '../model/taskModel.js';

// Retrieve all tasks
export const getTasks = async (req, res) => {
    try {
        const tasksList = await taskModel.find();
        res.status(200).json(tasksList);
    } catch (error) {
        console.error('Error in getTasks:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Create a new task
export const createTask = async (req, res) => {
    try {
        const { taskName, isCompleted } = req.body;

        if (typeof isCompleted !== 'boolean' || !taskName.trim()) {
            res.status(400).json({ success: false, message: 'Invalid input data' });
            return;
        }

        const newTask = await taskModel.create({ taskName, isCompleted });
        res.status(201).json(newTask);
    } catch (error) {
        console.error('Error in createTask:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Update a task
export const modifyTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { taskName, isCompleted } = req.body;

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(400).json({ success: false, message: 'Invalid ID' });
            return;
        }

        const task = await taskModel.findById(id);

        if (!task) {
            res.status(404).json({ success: false, message: 'Task not found' });
            return;
        }

        if (typeof isCompleted !== 'boolean' && isCompleted !== undefined) {
            res.status(400).json({ success: false, message: 'Invalid isCompleted value' });
            return;
        }

        if (taskName !== undefined) {
            if (!taskName.trim()) {
                res.status(400).json({ success: false, message: 'Invalid task name' });
                return;
            }
            task.taskName = taskName;
        }

        if (isCompleted !== undefined) {
            task.isCompleted = isCompleted;
        }

        await task.save();
        res.status(200).json(task);
    } catch (error) {
        console.error('Error in modifyTask:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Delete a task
export const removeTask = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(400).json({ success: false, message: 'Invalid ID' });
            return;
        }

        const task = await taskModel.findById(id);

        if (!task) {
            res.status(404).json({ success: false, message: 'Task not found' });
            return;
        }

        const result = await taskModel.deleteOne({ _id: task._id });

        if (result.deletedCount === 1) {
            res.status(200).json({ success: true, message: 'Task deleted successfully' });
        } else {
            res.status(500).json({ success: false, message: 'Failed to delete the task' });
        }
    } catch (error) {
        console.error('Error in removeTask:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
