const express = require('express');
const { reportFault, getFaultHistory } = require('../controllers/faultController.js');
const { validateFaultInput, handleValidationErrors, isAuthenticated } = require('../middleware/validateInput.js');

const router = express.Router();

// reporting fault route
router.post('/report', isAuthenticated, validateFaultInput, handleValidationErrors, reportFault);

//grtting fault history route
router.get('/history', isAuthenticated, getFaultHistory);

module.exports = router;
