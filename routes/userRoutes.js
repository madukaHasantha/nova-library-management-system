const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

// Create User
router.post("/create", UserController.createUser);

// Delete User
router.delete("/delete/:id", UserController.deleteUser);

module.exports = router;
