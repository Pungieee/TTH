const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

// Database setup
const db = new sqlite3.Database('trendytreehugger.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the trendytreehugger database.');
});

// Route to submit a new carbon footprint entry
router.post('/submit', (req, res) => {
  const { productName, category, carbonFootprint, description } = req.body;
  const userId = 1; // Assuming user ID is always 1

  const date = new Date().toLocaleDateString();

  if (!productName || !category || !carbonFootprint || !description) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  db.run('INSERT INTO carbon (user_id, product_name, category, carbon_footprint, description, date) VALUES (?, ?, ?, ?, ?, ?)', 
         [userId, productName, category, carbonFootprint, description, date], 
         (err) => {
           if (err) {
             console.error(err);
             return res.status(500).json({ error: 'Internal server error' });
           }

           res.status(201).json({ message: 'Carbon footprint submitted successfully' });
         });
});

// Route to get a user's carbon footprint history
router.get('/history', (req, res) => {
  const userId = 1; // Assuming user ID is always 1

  const sql = 'SELECT * FROM carbon WHERE user_id = ?';
  db.all(sql, [userId], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    res.json(rows);
  });
});

// Route to get the total carbon footprint for today
router.get('/today', (req, res) => {
  const userId = 1; // Assuming user ID is always 1
  const today = new Date().toLocaleDateString();

  const sql = 'SELECT SUM(carbon_footprint) AS totalCarbonFootprint FROM carbon WHERE user_id = ? AND date = ?';
  db.get(sql, [userId, today], (err, row) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    res.json({ totalCarbonFootprint: row.totalCarbonFootprint });
  });
});

// Route to delete a carbon footprint entry
router.delete('/:carbonId', (req, res) => {
  const { carbonId } = req.params;

  const sql = 'DELETE FROM carbon WHERE id = ?';
  db.run(sql, [carbonId], function(err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Carbon footprint not found' });
    }
    res.json({ message: 'Carbon footprint deleted successfully' });
  });
});

module.exports = router;
