const express = require('express');
const { reportFault, getFaultHistory } = require('../controllers/faultController.js');
const { validateFaultInput, handleValidationErrors, isAuthenticated } = require('../middleware/validateInput.js');

const router = express.Router();

// Reporting fault route
router.post('/report', isAuthenticated, validateFaultInput, handleValidationErrors, reportFault);

// Getting fault history route
router.get('/history', isAuthenticated, getFaultHistory);

module.exports = router;
 