const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.js'); 
const adminAuthRoutes = require('./routes/adminAuth.js'); 
const faultRoutes = require('./routes/fault.js'); 
const Admin = require('./models/Admin.js'); 
const User = require('./models/User.js'); 
const Fault = require('./models/Fault.js'); 

const PORT = process.env.PORT || 8080;
require('dotenv').config();
const sequelize = require('./config/database.js');


const app = express();

// Use CORS middleware 
app.use(cors());

// // Allow requests from the front-end origin
// app.use(cors({
//     origin: 'http://127.0.0.1:5501', // or use 'http://localhost:5501' if needed
// }));


// Middleware for parsing JSON
app.use(express.json()); 

// Use routes
app.use('/api/auth', authRoutes); 
app.use('/api/admin', adminAuthRoutes);
app.use('/api/fault', faultRoutes); 
// app.use(express.static('./ELECTRIC_FAULT/')); // Adjust path as necessary


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
