const { Sequelize } = require('sequelize');

const isProduction = process.env.NODE_ENV === 'production';

let sequelize;

if (isProduction) {
  // Production database on Render
  const connectionString = process.env.DATABASE_URL || 'postgresql://fault_reporting_db_user:ZmncyxcP5RPHES759KUkcb8KWuRPTbbN@dpg-cs1tm9m8ii6s73d81ugg-a.oregon-postgres.render.com/fault_reporting_db';
  sequelize = new Sequelize(connectionString, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} 
else {
  // Local PostgreSQL database for development
  sequelize = new Sequelize('faultReportingSystem', 'admin', 'admin123', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
  });
}

module.exports = sequelize;

