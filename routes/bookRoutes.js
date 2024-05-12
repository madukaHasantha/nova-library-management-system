const express = require("express");
const router = express.Router();
const BookController = require("../controllers/bookController");

// Create Book
router.post("/create", BookController.createBook);

// Delete Book
router.delete("/delete/:id", BookController.deleteBook);

// View All Books
router.get("/get_all", BookController.getAllBooks);

module.exports = router;
