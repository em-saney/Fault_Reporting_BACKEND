const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

//defining User model
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  regNumber: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

// syncing user model with the database
User.sync()
  // .then(() => {
  //   console.log('User table created successfully');
  // })
  // .catch((error) => {
  //   console.error('Error creating User table:', error);
  // });

module.exports = User;
