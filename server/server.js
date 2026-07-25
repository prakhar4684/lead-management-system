const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const env = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const leadRoutes = require('./routes/leadRoutes');
const mongoose = require('mongoose');
const cors=require('cors');
env.config();


const cors = require("cors");

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://lead-management-system-chi-umber.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/leaddesk';

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB connected successfully');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1); 
    });