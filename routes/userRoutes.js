const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Create User
router.post('/', UserController.createUser);

// Delete User
router.delete('/:id', UserController.deleteUser);

module.exports = router;
