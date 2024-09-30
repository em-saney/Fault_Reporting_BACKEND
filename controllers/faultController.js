const Fault = require('../models/Fault.js'); 

// reporting Fault
const reportFault = async (req, res) => {
  const { natureOfFault, description, hostel, hostelBlock, roomNumber } = req.body;
  const userId = req.user.id; 

  try {
    // creating a new fault report
    const newFault = await Fault.create({
      userId,
      natureOfFault,
      description,
      hostel,
      hostelBlock,
      roomNumber,
    });

    // getting the updated fault history for the user
    const faults = await Fault.findAll({ 
      where: { userId }, 
      order: [['createdAt', 'DESC']] 
    });

    res.status(201).json({
      message: 'report send successfully',
      fault: newFault,
      faultHistory: faults,
    });
  } catch (error) {
    res.status(500).json({ message: 'reporting failed', error });
  }
};

// getting fault history/previus
const getFaultHistory = async (req, res) => {
  const userId = req.user.id;

  try {
    // Fetching all fault reports related to the user, sorted by date
    const faults = await Fault.findAll({ 
      where: { userId }, 
      order: [['createdAt', 'DESC']] 
    });

    res.status(200).json(faults);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving fault history', error });
  }
};

module.exports = { reportFault, getFaultHistory };
