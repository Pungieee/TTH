const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('trendytreehugger.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('search.js connected to the trendytreehugger database.');
});

// Route to get all product names
router.get('/', (req, res) => {
    const searchTerm = req.query.q; // Get the search term from the query parameter
    const sql = `SELECT men_name AS name FROM men_product WHERE men_name LIKE '%${searchTerm}%'
    UNION
    SELECT women_name FROM women_product WHERE women_name LIKE '%${searchTerm}%'
    UNION
    SELECT kid_name FROM kid_product WHERE kid_name LIKE '%${searchTerm}%'`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error querying database.');
        } else {
            console.log('Search results:', rows);
            res.json(rows);
        }
    });
});

module.exports = router;