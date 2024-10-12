const Admin = require('../models/Admin.js');
const Fault = require('../models/Fault.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

// Admin login controller
exports.adminLogin = async (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  try {
    // Check if the admin exists
    const admin = await Admin.findOne({ where: { username } });
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found.' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Generate JWT token with secret from .env
    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',  // Token expiration time
    });

    // Return the generated token
    res.json({ token });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};

// Get all reports
exports.getReports = async (req, res) => {
  try {
    const reports = await Fault.findAll(); // Fetch reports from the database
    res.json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

/// Reply to a specific report and update the status to 'replied'
exports.replyToReport = async (req, res) => {
  const { id } = req.params; 
  const { feedback } = req.body;

  // Validate the ID
  if (!id || isNaN(id)) {
    return res.status(400).json({ message: 'Invalid report ID' });
  }

  const reportId = parseInt(id, 10);

  try {
    // Update the feedback and status of the report
    const [updated] = await Fault.update(
      { feedback, status: 'replied' },
      { where: { id: reportId } } // Use the converted ID
    );

    if (updated) {
      return res.status(200).json({ message: 'Feedback sent successfully and status updated to replied.' });
    } else {
      return res.status(404).json({ message: 'Report not found.' });
    }
  } catch (error) {
    console.error('Error sending feedback:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Get status of a specific report
exports.getReportStatus = async (req, res) => {
  const { id } = req.params; // Get report ID from params
  try {
    const report = await Fault.findOne({ where: { id } }); // Fetch specific report
    if (!report) {
      return res.status(404).json({ message: 'Report not found.' });
    }
    res.json(report);
  } catch (error) {
    console.error('Error fetching report status:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Get all reports, or filter by status if query param is provided
exports.getReports = async (req, res) => {
  const { status } = req.query;  // Query parameter for filtering
  
  try {
    let reports;
    if (status) {
      // Filter reports based on the status (e.g., unreplied, replied)
      reports = await Fault.findAll({ where: { status } });
    } else {
      // Fetch all reports if no status filter is applied
      reports = await Fault.findAll();
    }
    res.json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Get report counts by status
exports.getReportCounts = async (req, res) => {
  try {
    const totalReports = await Fault.count(); // Count total reports
    const unreadReports = await Fault.count({ where: { status: 'unreplied' } }); // Count unread reports
    const repliedReports = await Fault.count({ where: { status: 'replied' } }); // Count replied reports

    res.status(200).json({
      totalReports,
      unreadReports,
      repliedReports,
    });
  } catch (error) {
    console.error('Error counting reports:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Admin logout and destroy session
exports.logoutAdmin = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to logout' });
    }
    res.status(200).json({ message: 'Logout successful' }); // Redirect or send message
  });
};
