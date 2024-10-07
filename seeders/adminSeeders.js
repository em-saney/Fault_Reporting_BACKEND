
require('dotenv').config();
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin'); // Make sure this path is correct

const seedAdmin = async () => {
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  console.log("Admin Username:", adminUsername);
  console.log("Admin Password:", adminPassword);

  const hashedPassword = await bcrypt.hash(adminPassword, 10); // Ensure this line is not reached if adminPassword is undefined

  // Check if admin exists
  const adminExists = await Admin.findOne({ where: { username: adminUsername } });

  if (!adminExists) {
    await Admin.create({
      username: adminUsername,
      password: hashedPassword,
    });
    console.log("Admin user created successfully.");
  } else {
    console.log("Admin user already exists.");
  }
};

seedAdmin().catch(error => {
  console.error("Error seeding admin user:", error);
});
