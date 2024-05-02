
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');

const app = express();
const PORT = process.env.PORT || 4000;

// Enable CORS
app.use(cors());

// Database setupa
const db = new sqlite3.Database('trendytreehugger.db');

// Import routes
const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');
const carbonRoute = require('./routes/carbon');
const menRouter = require('./routes/men');
const womenRouter = require('./routes/women');
const kidRouter = require('./routes/kid');
const saleRouter = require('./routes/sale');
const newRouter = require('./routes/new');
const searchRouter = require('./routes/search');
const eduRouter = require('./routes/education');
const cartRouter = require('./routes/cart');
const favRouter = require('./routes/fav');





// Middleware
app.use(express.json());

// Define routes
app.get('/', (req, res) => {
  res.send('Hello from TrendyTreehugger backend!');
});

//Search part
app.get('/api/searchResults', (req, res) => {
  // Extract search term from request query
  const searchTerm = req.query.q;
  // Your SQL query here...
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


// Use signup route
app.use('/api/signup', signupRoute);
app.use('/api/login', loginRoute);
app.use('/api/carbon', carbonRoute);
app.use('/api/men', menRouter);
app.use('/api/women', womenRouter);
app.use('/api/kid', kidRouter);
app.use('/api/sale', saleRouter);
app.use('/api/new', newRouter);
app.use('/api/search', searchRouter);
app.use('/api/education', eduRouter);
app.use('/api/cart', cartRouter);
app.use('/api/fav', cartRouter);




// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});