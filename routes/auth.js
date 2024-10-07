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
router.post('/register', validateRegistrationInput, handleValidationErrors, registerUser);
router.post('/login', loginUser); // Consider adding validation if needed
router.post('/reset-password', resetPassword); // Consider adding validation if needed
router.post('/logout', logoutUser);

module.exports = router;
