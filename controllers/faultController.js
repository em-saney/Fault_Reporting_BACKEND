const Fault = require('../models/Fault.js');

// Reporting Fault
const reportFault = async (req, res) => {
  const { natureOfFault, description, hostel, hostelBlock, roomNumber } = req.body;

  try {
    // Extract userId from the authenticated user (req.user should be populated by middleware)
    const userId = req.user.id;

    // Validate userId
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Creating a new fault report
    const fault = await Fault.create({
      userId,
      natureOfFault,
      description,
      hostel,
      hostelBlock,
      roomNumber,
    });

    return res.status(201).json({ message: 'Fault reported successfully', fault });
  } catch (error) {
    console.error('Reporting failed:', error);
    return res.status(500).json({ message: 'Reporting failed', error: error.message });
  }
};

// Getting Fault History
const getFaultHistory = async (req, res) => {
  try {
    // Extract userId from the authenticated user (req.user should be populated by middleware)
    const userId = req.user.id;

    // Validate userId
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Fetching all fault reports related to the user, sorted by date
    const faults = await Fault.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json(faults);
  } catch (error) {
    console.error('Retrieving Fault History Error:', error);
    res.status(500).json({ message: 'Error retrieving fault history', error: error.message });
  }
};

module.exports = { reportFault, getFaultHistory };
