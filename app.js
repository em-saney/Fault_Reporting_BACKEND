const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth.js');
const faultRoutes = require('./routes/fault.js');
const PORT = process.env.PORT || 5000;

//importing Sequelize instance 
const sequelize = require('./config/database'); 

const app = express();

// middleware for parsing JSON bodies
app.use(bodyParser.json());

// Use the auth routes
app.use('/', authRoutes);
app.use('/api/fault', faultRoutes);

// staeting server
sequelize.authenticate()
  .then(() => {
    console.log('Database connected.');


    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
