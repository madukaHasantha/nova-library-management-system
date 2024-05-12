const Borrowing = require('../models/borrowingModel');
const Book = require('../models/bookModel');
const User = require('../models/userModel');

exports.borrowBook = async (req, res) => {
  const { userId, bookId } = req.body;
  
  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check if the book is available
    if (book.availableCopies <= 0) {
      return res.status(400).json({ message: 'No available copies of the book' });
    }

    // Update available copies of the book
    book.availableCopies -= 1;
    await book.save();

    // Create borrowing record
    const borrowing = new Borrowing({
      userId: user._id,
      bookId: book._id,
      isReturned: false
    });
    await borrowing.save();

    res.status(201).json({ message: 'Book borrowed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.returnBook = async (req, res) => {
    const borrowingId = req.params.id; // Borrowing ID
  
    try {
      // Check if the borrowing record exists
      const borrowing = await Borrowing.findById(borrowingId);
      if (!borrowing) {
        return res.status(404).json({ message: 'Borrowing record not found' });
      }
  
      // Check if the book is already returned
      if (borrowing.isReturned) {
        return res.status(400).json({ message: 'Book is already returned' });
      }
  
      // Update borrowing record
      borrowing.isReturned = true;
      await borrowing.save();
  
      // Update available copies of the book
      const book = await Book.findById(borrowing.bookId);
      book.availableCopies += 1;
      await book.save();
  
      res.json({ message: 'Book returned successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  exports.getSelfBorrowings = async (req, res) => {
    const userId = req.user._id; // Assuming userId is extracted from token
  
    try {
      // Retrieve borrowings for the user
      const borrowings = await Borrowing.find({ userId });
  
      res.json(borrowings);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  exports.getBorrowingsByUser = async (req, res) => {
    const userId = req.params.userId; // User ID
  
    try {
      // Retrieve borrowings for the specified user
      const borrowings = await Borrowing.find({ userId });
  
      res.json(borrowings);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  
  
