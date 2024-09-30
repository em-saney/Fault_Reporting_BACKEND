const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

// my JWT secret key
const JWT_SECRET = 'is been a while that i try this but Sha.....!';

// handling registration input validation
const validateRegistrationInput = [
  check('name').not().isEmpty().withMessage('Name is required'),
  check('regNumber').not().isEmpty().withMessage('Registration number is required'),
  check('phoneNumber').isMobilePhone().withMessage('Phone number is invalid'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  check('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
];

// handling fault reporting input validation
const validateFaultInput = [
  check('natureOfFault').not().isEmpty().withMessage('Nature of fault is required'),
  check('description').not().isEmpty().withMessage('Description is required'),
  check('hostel').not().isEmpty().withMessage('Hostel is required'),
  check('hostelBlock').not().isEmpty().withMessage('Hostel block is required'),
  check('roomNumber').not().isEmpty().withMessage('Room number is required'),
];

// middleware handling validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// middleware to checking if user is authenticated
const isAuthenticated = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ message: 'Token not recognized' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Authorization error' });
    }

    req.user = decoded; 
    next();
  });
};

module.exports = { 
  validateRegistrationInput, 
  handleValidationErrors, 
  isAuthenticated,
  validateFaultInput 
};
