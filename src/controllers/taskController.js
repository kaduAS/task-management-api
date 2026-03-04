const prisma = require('../config/database');
const { validationResult } = require('express-validator');

// Get all tasks for a user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

// Get single task
exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) }
    });

    if (!task || task.userId !== req.user.id) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({ error: 'Failed to fetch task' });
  }
};

// Create task
exports.createTask = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, priority, dueDate } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        description: description || null,
        priority: priority || 'medium',
        dueDate: dueDate ? new Date(dueDate) : null,
        userId: req.user.id
      }
    });

    res.status(201).json({
      message: 'Task created successfully',
      task
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed, priority, dueDate } = req.body;

    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) }
    });

    if (!task || task.userId !== req.user.id) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id) },
      data: {
        title: title !== undefined ? title : task.title,
        description: description !== undefined ? description : task.description,
        completed: completed !== undefined ? completed : task.completed,
        priority: priority !== undefined ? priority : task.priority,
        dueDate: dueDate !== undefined ? new Date(dueDate) : task.dueDate
      }
    });

    res.status(200).json({
      message: 'Task updated successfully',
      task: updatedTask
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) }
    });

    if (!task || task.userId !== req.user.id) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await prisma.task.delete({
      where: { id: parseInt(id) }
    });

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
};

// Get tasks by priority
exports.getTasksByPriority = async (req, res) => {
  try {
    const { priority } = req.params;
    const validPriorities = ['low', 'medium', 'high'];

    if (!validPriorities.includes(priority)) {
      return res.status(400).json({ error: 'Invalid priority value' });
    }

    const tasks = await prisma.task.findMany({
      where: {
        userId: req.user.id,
        priority: priority
      },
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Get tasks by priority error:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

// Toggle task completion
exports.toggleTaskCompletion = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) }
    });

    if (!task || task.userId !== req.user.id) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { completed: !task.completed }
    });

    res.status(200).json({
      message: 'Task completion toggled',
      task: updatedTask
    });
  } catch (error) {
    console.error('Toggle task error:', error);
    res.status(500).json({ error: 'Failed to toggle task' });
  }
};
