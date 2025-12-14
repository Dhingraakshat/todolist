const express = require('express');
const db = require('../database');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.use(authMiddleware);

// Get all tasks for user
router.get('/', (req, res) => {
  const query = `
    SELECT t.*, u.full_name as assigned_to_name, creator.full_name as creator_name
    FROM tasks t
    LEFT JOIN users u ON t.assigned_to = u.id
    LEFT JOIN users creator ON t.user_id = creator.id
    WHERE t.user_id = ? OR t.assigned_to = ?
    ORDER BY t.created_at DESC
  `;

  db.all(query, [req.user.id, req.user.id], (err, tasks) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch tasks' });
    }
    res.json(tasks);
  });
});

// Create task
router.post('/', (req, res) => {
  const { title, description, priority, due_date, assigned_to } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  db.run(
    `INSERT INTO tasks (user_id, title, description, priority, due_date, assigned_to) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [req.user.id, title, description, priority || 'medium', due_date, assigned_to],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to create task' });
      }

      db.get('SELECT * FROM tasks WHERE id = ?', [this.lastID], (err, task) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to fetch created task' });
        }
        res.status(201).json(task);
      });
    }
  );
});

// Update task
router.put('/:id', (req, res) => {
  const { title, description, status, priority, due_date, assigned_to } = req.body;
  const taskId = req.params.id;

  db.run(
    `UPDATE tasks 
     SET title = COALESCE(?, title),
         description = COALESCE(?, description),
         status = COALESCE(?, status),
         priority = COALESCE(?, priority),
         due_date = COALESCE(?, due_date),
         assigned_to = COALESCE(?, assigned_to),
         updated_at = CURRENT_TIMESTAMP
     WHERE id = ? AND (user_id = ? OR assigned_to = ?)`,
    [title, description, status, priority, due_date, assigned_to, taskId, req.user.id, req.user.id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to update task' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Task not found or unauthorized' });
      }

      db.get('SELECT * FROM tasks WHERE id = ?', [taskId], (err, task) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to fetch updated task' });
        }
        res.json(task);
      });
    }
  );
});

// Delete task
router.delete('/:id', (req, res) => {
  const taskId = req.params.id;

  db.run(
    'DELETE FROM tasks WHERE id = ? AND user_id = ?',
    [taskId, req.user.id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to delete task' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Task not found or unauthorized' });
      }

      res.json({ message: 'Task deleted successfully' });
    }
  );
});

// Get task comments
router.get('/:id/comments', (req, res) => {
  const query = `
    SELECT c.*, u.full_name as user_name
    FROM task_comments c
    JOIN users u ON c.user_id = u.id
    WHERE c.task_id = ?
    ORDER BY c.created_at DESC
  `;

  db.all(query, [req.params.id], (err, comments) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch comments' });
    }
    res.json(comments);
  });
});

// Add comment to task
router.post('/:id/comments', (req, res) => {
  const { comment } = req.body;

  if (!comment) {
    return res.status(400).json({ error: 'Comment is required' });
  }

  db.run(
    'INSERT INTO task_comments (task_id, user_id, comment) VALUES (?, ?, ?)',
    [req.params.id, req.user.id, comment],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to add comment' });
      }

      res.status(201).json({ id: this.lastID, comment, user_id: req.user.id });
    }
  );
});

module.exports = router;
