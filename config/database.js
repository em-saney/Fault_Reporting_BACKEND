const { Sequelize } = require('sequelize');

// Setting up PostgreSQL connection using Sequelize

const sequelize = new Sequelize('faultReportingSystem', 'admin', 'admin123', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,

});

module.exports = sequelize;
