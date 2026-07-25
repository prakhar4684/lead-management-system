const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

const Admin = require("./models/Admin");

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");

    // Delete existing admins
    await Admin.deleteMany({});
    console.log("🗑️ Old Admin Deleted");

    // Hash password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Create admin
    await Admin.create({
      name: "Prakhar Shukla",
      email: "admin@leaddesk.com",
      password: hashedPassword,
    });

    console.log("🌱 Admin Created Successfully");
    console.log("=================================");
    console.log("Email    : admin@leaddesk.com");
    console.log("Password : admin123");
    console.log("=================================");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding Error:", error);
    process.exit(1);
  }
};

seedAdmin();