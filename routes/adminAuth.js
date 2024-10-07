const express = require('express');

const { adminLogin } = require('../controllers/adminController.js');
const { validateLoginInput, handleValidationErrors } = require('../middleware/validateInput.js');

const router = express.Router();

// Admin login route
router.post('/login', validateLoginInput, handleValidationErrors, adminLogin);

module.exports = router;
