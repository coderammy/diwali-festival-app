const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const COMMENTS_FILE = path.join(__dirname, 'comments.json');

// Middleware
app.use(express.static('public'));
app.use(express.json());

// Read comments
app.get('/api/comments', (req, res) => {
  fs.readFile(COMMENTS_FILE, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error reading file' });
    res.json(JSON.parse(data || '[]'));
  });
});

// Save a new comment
app.post('/api/comments', (req, res) => {
  const newComment = { name: req.body.name, message: req.body.message, date: new Date() };
  fs.readFile(COMMENTS_FILE, 'utf-8', (err, data) => {
    const comments = data ? JSON.parse(data) : [];
    comments.push(newComment);
    fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 2), err => {
      if (err) return res.status(500).json({ error: 'Error saving comment' });
      res.json({ success: true, comment: newComment });
    });
  });
});

app.listen(PORT, () => console.log(`🪔 Server running at http://localhost:${PORT}`));
