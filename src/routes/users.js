const express = require('express');
const router = express.Router();
const { users } = require('../data/users');

router.get('/', (req, res) => {
  res.json(users);
});

router.post('/', (req, res) => {
  const user = req.body;
  user.id = Date.now().toString();
  users.push(user);
  res.status(201).json(user);
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return res.status(404).json({ message: 'User not found' });

  users[index] = { ...users[index], ...req.body };
  res.json(users[index]);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return res.status(404).json({ message: 'User not found' });

  const deleted = users.splice(index, 1);
  res.json(deleted[0]);
});

module.exports = router;
