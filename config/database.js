const { Sequelize } = require('sequelize');

// Set up PostgreSQL connection using Sequelize
const sequelize = new Sequelize(
  process.env.DATABASE_URL || 'faultReportingSystem',  // Use DATABASE_URL in production, fallback to local DB
  process.env.DATABASE_USER || 'admin',             // Use DATABASE_USER in local setup
  process.env.DATABASE_PASSWORD || 'admin123',      // Use DATABASE_PASSWORD in local setup
  {
    host: process.env.DATABASE_HOST || 'localhost',    // Use DATABASE_HOST in local setup
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: process.env.DATABASE_URL ? {                // Enable SSL if using DATABASE_URL
        require: true,
        rejectUnauthorized: false,  // Adjust based on your SSL requirements
      } : false,
    },
  }
);

module.exports = sequelize;
