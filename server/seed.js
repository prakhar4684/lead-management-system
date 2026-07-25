const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Lead = require("./models/Leads");

dotenv.config();

const seedLeads = [
  {
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    phone: "9876543210",
    budget: 50000,
    company: "Tech Solutions",
    message: "Need a business website.",
    status: "New",
  },
  {
    name: "Priya Verma",
    email: "priya@gmail.com",
    phone: "9123456789",
    budget: 100000,
    company: "Creative Studio",
    message: "Looking for a full-stack web application.",
    status: "Contacted",
  },
  {
    name: "Amit Singh",
    email: "amit@gmail.com",
    phone: "9988776655",
    budget: 75000,
    company: "StartupX",
    message: "Need an admin dashboard.",
    status: "Closed",
  },
  {
    name: "Sneha Gupta",
    email: "sneha@gmail.com",
    phone: "9871234567",
    budget: 30000,
    company: "EduTech",
    message: "Need a landing page.",
    status: "New",
  },
  {
    name: "Rohit Kumar",
    email: "rohit@gmail.com",
    phone: "9012345678",
    budget: 200000,
    company: "FinCorp",
    message: "Looking for a CRM solution.",
    status: "Contacted",
  },
  {
    name: "Ananya Mishra",
    email: "ananya@gmail.com",
    phone: "9898989898",
    budget: 120000,
    company: "Digital Waves",
    message: "Need an e-commerce website.",
    status: "New",
  },
  {
    name: "Vikram Patel",
    email: "vikram@gmail.com",
    phone: "9090909090",
    budget: 85000,
    company: "BuildTech",
    message: "Want a portfolio website.",
    status: "Closed",
  },
  {
    name: "Neha Kapoor",
    email: "neha@gmail.com",
    phone: "9797979797",
    budget: 60000,
    company: "Media Hub",
    message: "Looking for a landing page redesign.",
    status: "Contacted",
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");

    await Lead.deleteMany({});
    console.log("🗑️ Old Leads Deleted");

    await Lead.insertMany(seedLeads);
    console.log("🌱 Dummy Leads Inserted Successfully");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding Error:", error);
    process.exit(1);
  }
};

seedDB();