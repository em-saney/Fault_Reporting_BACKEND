const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const JWT_SECRET = 'is been a while that i try this but Sha.....!'; 

// handling student registration

const registerUser = async (req, res) => {
  const { name, regNumber, phoneNumber, password, confirmPassword } = req.body;

  // checking if passwords matches
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    // checking if the regNumber already exists in the database
    const existingUser = await User.findOne({ where: { regNumber } });
    if (existingUser) {
      return res.status(400).json({ message: 'registration number already exists' });
    }

    // hashing password using salt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // creating new user in PostgreSQL
    const newUser = await User.create({
      name,
      regNumber,
      phoneNumber,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'Student registeration was successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'student registration failed', error });
  }
};

// handling student login
const loginUser = async (req, res) => {
  const { regNumber, password } = req.body;

  try {
    // checking if student registration number already exists
    const user = await User.findOne({ where: { regNumber } });
    if (!user) {
      return res.status(400).json({ message: 'Registration number not found' });
    }

    // Comparing the entered password with the hashed password in the DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'The password you entered is incorrect' });
    }

    // generating JWT token
    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: '1h', 
    });

    res.status(200).json({
      message: 'login successful',
      user: {
        id: user.id,
        name: user.name,
        regNumber: user.regNumber,
        phoneNumber: user.phoneNumber,
      },
      token, 
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};

// resetting student password
const resetPassword = async (req, res) => {
  const { phoneNumber, newPassword, confirmPassword } = req.body;

  try {
    // checking if the phone number exists in the database
    const user = await User.findOne({ where: { phoneNumber } });
    if (!user) {
      return res.status(400).json({ message: 'Phone number not found' });
    }

    // cheching if newPassword and confirmPassword matches
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // hashing the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Updating the password in the database
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: 'Password reset failed', error });
  }
};

const logoutUser = (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = {
  registerUser,
  loginUser,
  resetPassword,
  logoutUser,
};

