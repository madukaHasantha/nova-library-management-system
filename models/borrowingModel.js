const mongoose = require("mongoose");

const borrowingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  isReturned: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Borrowing", borrowingSchema);
