const mongoose = require('mongoose');
require('dotenv').config();

const DB_URI = process.env.DB_URI;

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

module.exports = mongoose.connection;