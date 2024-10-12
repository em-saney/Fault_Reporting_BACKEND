const express = require('express');
const router = express.Router(); // Initialize the router

// Importing validation middleware
const { validateRegistrationInput, handleValidationErrors } = require('../middleware/validateInput.js');

// Importing all the required controllers
const {
  registerUser,
  loginUser,
  resetPassword,
  logoutUser,
} = require('../controllers/authController.js');

// Defining routes
// Middleware for validation should come before the controller function
router.post('/register', validateRegistrationInput, handleValidationErrors, registerUser);
router.post('/login', loginUser); // You can add validation for login if needed
router.post('/reset-password', resetPassword); // You can add validation for reset-password if needed
router.post('/logout', logoutUser);

module.exports = router;
