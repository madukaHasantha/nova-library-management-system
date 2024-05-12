const Book = require("../models/bookModel");

exports.createBook = async (req, res) => {
  // Extract book details from request body
  const { name, totalCopies, availableCopies } = req.body;

  try {
    // Create book document
    const book = new Book({ name, totalCopies, availableCopies });
    await book.save();

    res.status(201).json({ message: "Book created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteBook = async (req, res) => {
  const bookId = req.params.id; // Book ID

  try {
    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Delete book document
    await Book.findByIdAndDelete(bookId);

    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    // Retrieve all books from database
    const books = await Book.find();

    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
