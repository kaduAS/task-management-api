const express = require('express');
const { body } = require('express-validator');
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Get all tasks
router.get('/', taskController.getTasks);

// Get task by ID
router.get('/:id', taskController.getTaskById);

// Get tasks by priority
router.get('/priority/:priority', taskController.getTasksByPriority);

// Create task
router.post(
  '/',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Invalid priority')
  ],
  taskController.createTask
);

// Update task
router.put(
  '/:id',
  [
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Invalid priority')
  ],
  taskController.updateTask
);

// Delete task
router.delete('/:id', taskController.deleteTask);

// Toggle task completion
router.patch('/:id/toggle', taskController.toggleTaskCompletion);

module.exports = router;
