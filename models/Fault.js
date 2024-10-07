const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Fault = sequelize.define('Fault', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User', // Reference the User model
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
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'unreplied',
  },
  feedback: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, {
  tableName: 'Fault', // Specify the table name
  timestamps: true,
});

module.exports = Fault;
