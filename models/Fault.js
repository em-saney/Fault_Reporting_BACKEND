const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js'); 
const User = require('./User.js');

const Fault = sequelize.define('Fault', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, 
      key: 'id',  
    },
  },
  natureOfFault: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  hostel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hostelBlock: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  roomNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true, 
});

// syncing fault model with the database
Fault.sync()
  // .then(() => {
  //   console.log('Fault table created successfully');
  // })
  // .catch((error) => {
  //   console.error('Error creating Fault table:', error);
  // });

module.exports = Fault;
