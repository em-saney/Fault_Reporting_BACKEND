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
    defaultValue: 'unreplied', // Default status for new faults
  },
  feedback: {
    type: DataTypes.TEXT,
    allowNull: true, // Feedback can be optional
  }
}, {
  tableName: 'Fault', // Specify the table name
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// // Define associations if needed
// Fault.associate = (models) => {
//   Fault.belongsTo(models.User, {
//     foreignKey: 'userId', // Foreign key in the Fault table
//     as: 'user', // Alias for the association
//   });
// };

module.exports = Fault;
