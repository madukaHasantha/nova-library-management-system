const User = require('../models/userModel');
const Auth = require('../models/authModel');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
  // Extract user details from request body
  const { email, password, name, type } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ authId: email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create authentication document
    const auth = new Auth({ _id: email, password: hashedPassword });
    await auth.save();

    // Create user document
    const user = new User({ authId: email, name, type });
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteUser = async (req, res) => {
    const userId = req.params.id; // User ID
    console.log(userId);
    try {
      // Check if user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Delete associated authentication document
      await Auth.findByIdAndDelete(user.authId);
  
      // Delete user document
      await user.delete();
  
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  

