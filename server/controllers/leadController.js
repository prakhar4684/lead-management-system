const Lead = require("../Models/Leads");

module.exports.createLead = async (req, res) => {
  try {
    const { name, email, phone, budget, company, message } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name, Email and Phone are required",
      });
    }

    const lead = await Lead.create({
      name,
      email,
      phone,
      budget,
      company,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Lead created successfully",
      lead,
    });
  } catch (error) {
    console.error("Create Lead Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


module.exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      leads,
    });
  } catch (error) {
    console.error("Get Leads Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


module.exports.getLeadById = async (req, res) => {
  try {
    const leadId = req.params.id;

    const lead = await Lead.findById(leadId);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    return res.status(200).json({
      success: true,
      lead,
    });

  } catch (error) {
    console.error("Get Lead By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports.deleteLead = async (req, res) => {
  try {
    const leadId = req.params.id;

    const lead = await Lead.findByIdAndDelete(leadId);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
    });

  } catch (error) {
    console.error("Delete Lead Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports.updateLeadStatus = async (req, res) => {
  try {
    const leadId = req.params.id;
    const { status } = req.body;

    // Check if status is provided
    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    // Validate status
    const validStatus = ["New", "Contacted", "Closed"];

    if (!validStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    // Update lead
    const lead = await Lead.findByIdAndUpdate(
      leadId,
      { status },
      { new: true, runValidators: true }
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lead status updated successfully",
      lead,
    });

  } catch (error) {
    console.error("Update Lead Status Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


const mongoose = require("mongoose");

module.exports.searchLeads = async (req, res) => {
  try {
    const { q } = req.query;

    const conditions = [
      { name: { $regex: q, $options: "i" } },
      { email: { $regex: q, $options: "i" } },
      { company: { $regex: q, $options: "i" } },
    ];

    // Search by ObjectId if query is a valid MongoDB ID
    if (mongoose.Types.ObjectId.isValid(q)) {
      conditions.push({ _id: q });
    }

    const leads = await Lead.find({
      $or: conditions,
    });

    return res.status(200).json({
      success: true,
      count: leads.length,
      leads,
    });
  } catch (error) {
    console.error("Search Lead Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};