const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

// Handling student registration
const registerUser = async (req, res) => {
  const { name, regNumber, phoneNumber, password, confirmPassword } = req.body; // Use regNumber here

  // Checking if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    // Checking if the regNumber already exists in the database
    const existingUser = await User.findOne({ where: { regNumber } }); // Use regNumber instead of registrationNumber
    if (existingUser) {
      return res.status(400).json({ message: 'Registration number already exists' });
    }

    // Hashing password using salt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating new user in PostgreSQL
    const newUser = await User.create({
      name,
      regNumber, // Use regNumber here
      phoneNumber,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'Student registration was successful', user: newUser });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Student registration failed', error });
  }
};

// Handling student login
const loginUser = async (req, res) => {
  const { regNumber, password } = req.body; // Use regNumber here

  try {
    // Checking if the student registration number exists
    const user = await User.findOne({ where: { regNumber } }); // Use regNumber here
    if (!user) {
      return res.status(400).json({ message: 'Registration number not found' });
    }

    // Comparing the entered password with the hashed password in the DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'The password you entered is incorrect' });
    }

    // Generating JWT token with 'id' instead of 'userId'
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h', // or whatever expiration you want
    });

    // Sending back the token
    res.json({ token });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Resetting student password
const resetPassword = async (req, res) => {
  const { phoneNumber, newPassword, confirmPassword } = req.body;

  try {
    // Checking if the phone number exists in the database
    const user = await User.findOne({ where: { phoneNumber } });
    if (!user) {
      return res.status(400).json({ message: 'Phone number not found' });
    }

    // Checking if newPassword and confirmPassword match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Hashing the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Updating the password in the database
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Password Reset Error:', error);
    res.status(500).json({ message: 'Password reset failed', error });
  }
};

// Logout user (optional; JWT usually handles this on the client side)
const logoutUser = (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = {
  registerUser,
  loginUser,
  resetPassword,
  logoutUser,
};