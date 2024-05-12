const express = require('express');
const router = express.Router();
const BorrowingController = require('../controllers/borrowingController');

// Borrow Book
router.post('/', BorrowingController.borrowBook);

// Return Book
router.put('/:id', BorrowingController.returnBook);

// View Self Borrowings
router.get('/self', BorrowingController.getSelfBorrowings);

// View Borrowings by User
router.get('/:userId', BorrowingController.getBorrowingsByUser);

module.exports = router;
