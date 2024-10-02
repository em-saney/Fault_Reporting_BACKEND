const { Sequelize } = require('sequelize');

// Determine if running in production or development
const isProduction = process.env.NODE_ENV === 'production';

let sequelize;

if (isProduction) {
  const connectionString = 'postgresql://admin:oHsYynL1bUd1yFRPFUXn8uQpDYT2aLtu@dpg-crui0rtumphs73enpdfg-a/fault_reporting_system';

  // Ensure the connection string is not null or undefined
  if (!connectionString) {
    throw new Error('Connection string is not defined.');
  }

  sequelize = new Sequelize(connectionString, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else {
  // Local database connection
  sequelize = new Sequelize('faultReportingSystem', 'admin', 'admin123', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
  });
}

module.exports = sequelize;
