const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

// Handling Admin login input validation
const validateLoginInput = [
  check('username', 'the fucking error is from here').not().isEmpty(),
  check('password', 'Password is required').not().isEmpty(),
];

// Handling registration input validation
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

// Handling fault reporting input validation
const validateFaultInput = [
  check('natureOfFault').not().isEmpty().withMessage('Nature of fault is required'),
  check('description').not().isEmpty().withMessage('Description is required'),
  check('hostel').not().isEmpty().withMessage('Hostel is required'),
  check('hostelBlock').not().isEmpty().withMessage('Hostel block is required'),
  check('roomNumber').not().isEmpty().withMessage('Room number is required'),
];

// Middleware handling validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token not recognized' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Authorization error' });
    }

    req.user = { id: decoded.id }; // Match this key with the JWT payload
    next();
  });
};


module.exports = { 
  validateLoginInput,
  validateRegistrationInput, 
  handleValidationErrors, 
  isAuthenticated,
  validateFaultInput 
};
