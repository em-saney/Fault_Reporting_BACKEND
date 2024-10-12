const express = require('express');

const { adminLogin, getReports, replyToReport, getReportStatus, getReportCounts, logoutAdmin } = require('../controllers/adminController.js');
const { validateLoginInput, handleValidationErrors } = require('../middleware/validateInput.js');

const router = express.Router();

// Admin login route
router.post('/login', validateLoginInput, handleValidationErrors, adminLogin);

// Get all reports
router.get('/reports', getReports);

// Admin reply to report
router.put('/reports/reply/:id', replyToReport); 


// Get status of a specific report
router.get('/reports/:id/status', getReportStatus);

// In adminRouter.js
router.get('/reports/counts', getReportCounts);

// In adminRouter.js
router.post('/logout', logoutAdmin);

module.exports = router;
