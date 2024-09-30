const express = require('express');
const router = express.Router();

// importing validation middleware
const { validateRegistrationInput, handleValidationErrors } = require('../middleware/validateInput.js');

//importing all the required controllers
const { registerUser, loginUser, resetPassword, logoutUser } = require('../controllers/authController.js');

//defining routes
router.post('/register', validateRegistrationInput, handleValidationErrors, registerUser);
router.post('/login', loginUser);
router.post('/reset-password', resetPassword);
router.post('/logout', logoutUser);

module.exports = router;
