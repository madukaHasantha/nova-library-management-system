const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const borrowingRoutes = require('./routes/borrowingRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

// Routes
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/books', bookRoutes);
app.use('/borrowings', borrowingRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
