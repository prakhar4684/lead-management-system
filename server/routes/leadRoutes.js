const express = require("express");
const router = express.Router();

const {
  createLead,
  getLeads,
  getLeadById,
  deleteLead,
  updateLeadStatus,
  searchLeads,
} = require("../controllers/leadController");

const adminMiddleware = require("../middleware/adminMiddleware");

// Public Route
router.post("/", createLead);

// Protected Routes
router.get("/", adminMiddleware, getLeads);
router.get("/search", adminMiddleware, searchLeads);
router.get("/:id", adminMiddleware, getLeadById);
router.patch("/:id/status", adminMiddleware, updateLeadStatus);
router.delete("/:id", adminMiddleware, deleteLead);

module.exports = router;