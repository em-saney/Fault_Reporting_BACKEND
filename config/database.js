const { Sequelize } = require('sequelize');

const connectionString = process.env.DATABASE_URL || 'postgresql://fault_reporting_db_user:ZmncyxcP5RPHES759KUkcb8KWuRPTbbN@dpg-cs1tm9m8ii6s73d81ugg-a.oregon-postgres.render.com/fault_reporting_db';

// Making sure the connection string exists
if (!connectionString) {
  throw new Error('Connection string is not defined.');
}

// Use the external connection string for both local and production
const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true, // Render databases often require SSL
      rejectUnauthorized: false, // Allow self-signed certificates
    },
  },
});

module.exports = sequelize;