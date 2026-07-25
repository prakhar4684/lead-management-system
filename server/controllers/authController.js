const Admin = require("../Models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateToken = (admin) => {
  const payload = {
    id: admin._id,
    email: admin.email,
  };

  const secret = process.env.JWT_SECRET || "your_jwt_secret";

  return jwt.sign(payload, secret, {
    expiresIn: "7d",
  });
};

exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

  
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists",
      });
    }

  
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      token: generateToken(admin),
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });

  } catch (error) {
    console.error("Register Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};



exports.loginAdmin = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    console.log("Admin Found:", admin);

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    console.log("Password Match:", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    return res.status(200).json({
  success: true,
  message: "Login successful",
  token: generateToken(admin),
  admin: {
    id: admin._id,
    name: admin.name,
    email: admin.email,
  },
});

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};