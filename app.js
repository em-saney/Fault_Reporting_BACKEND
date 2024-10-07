const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.js'); // User authentication routes
const adminAuthRoutes = require('./routes/adminAuth.js'); // Admin authentication routes
const faultRoutes = require('./routes/fault.js'); // Fault reporting routes

const PORT = process.env.PORT || 3000;
require('dotenv').config();
const sequelize = require('./config/database.js');
const Admin = require('./models/Admin.js'); // Import your Admin model
const User = require('./models/User.js'); // Import your User model
const Fault = require('./models/Fault.js'); // Import your Fault model

const app = express();

// Define CORS options
const corsOptions = {
  origin: 'http://127.0.0.1:5501', // Allow requests only from this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// Use CORS middleware with options
app.use(cors(corsOptions));

// Middleware for parsing JSON
app.use(express.json()); // Use express built-in JSON parser

// Use routes
app.use('/api/auth', authRoutes); 
app.use('/api/admin', adminAuthRoutes);
app.use('/api/fault', faultRoutes); 

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Sync database models
const syncDatabase = async () => {
  try {
    // Ensure Admin is synced before Fault (if applicable)
    await Admin.sync({ alter: true });
    console.log('Admin table synchronized.');

    // Ensure User is synced before Fault (due to foreign key)
    await User.sync({ alter: true });
    console.log('User table synchronized.');

    // Sync Fault models
    await Fault.sync({ alter: true });
    console.log('Fault table synchronized.');
    
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
};

// Authenticate the database and start the server
sequelize.authenticate()
  .then(() => {
    console.log('Database connected.');

    // Sync models before starting the server
    return syncDatabase();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });

// Handle undefined routes
app.use('*', (req, res) => res.status(404).send('Route not found'));
