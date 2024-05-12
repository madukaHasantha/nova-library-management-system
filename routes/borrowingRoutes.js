const express = require('express');
const router = express.Router();
const BorrowingController = require('../controllers/borrowingController');

// Borrow Book
router.post('create/', BorrowingController.borrowBook);

// Return Book
router.put('/return/:id', BorrowingController.returnBook);

// View Self Borrowings
router.get('/get_self_borrowing', BorrowingController.getSelfBorrowings);

// View Borrowings by User
router.get('/get_by_user/:userId', BorrowingController.getBorrowingsByUser);

module.exports = router;
