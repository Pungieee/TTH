const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

// Database setup
const db = new sqlite3.Database('trendytreehugger.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('edu.js Connected to the trendytreehugger database.');
});

// Route to submit an article
router.post('/submit-article', (req, res) => {
    const { article_pic, article_title, article_descrip, article_body } = req.body;

    // Insert the article into the database
    const sql = 'INSERT INTO article (article_pic, article_title, article_descrip, article_body) VALUES (?, ?, ?, ?)';
    db.run(sql, [article_pic, article_title, article_descrip, article_body], function(err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        
        res.status(201).json({ message: 'Article submitted successfully', id: this.lastID });
    });
});

// Route to get all articles
router.get('/articles', (req, res) => {
    const sql = 'SELECT * FROM article';
    db.all(sql, (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(rows);
    });
});

// Route to get a specific article by ID
router.get('/articles/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM article WHERE id = ?';
    db.get(sql, [id], (err, row) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (!row) {
            return res.status(404).json({ error: 'Article not found' });
        }
        res.json(row);
    });
});

// Route to delete an article by ID
router.delete('/articles/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM article WHERE id = ?';
    db.run(sql, [id], function(err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Article not found' });
        }
        res.json({ message: 'Article deleted successfully' });
    });
});

module.exports = router;
