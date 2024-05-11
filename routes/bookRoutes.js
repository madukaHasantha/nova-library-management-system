const express = require('express');
const router = express.Router();
const BookController = require('../controllers/bookController');

// Create Book
router.post('/', BookController.createBook);

// Delete Book
router.delete('/:id', BookController.deleteBook);

// View All Books
router.get('/', BookController.getAllBooks);

module.exports = router;
