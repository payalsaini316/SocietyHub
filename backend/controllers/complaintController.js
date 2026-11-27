import Complaint from "../models/Complaint.js";

// Create Complaint
export const createComplaint = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    const complaint = await Complaint.create({
      title,
      description,
      category,
      resident: req.user.id,
      flatNumber: req.user.flatNumber
    });

    res.status(201).json({
      success: true,
      message: "Complaint submitted successfully",
      complaint
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Complaints
export const getComplaints = async (req, res) => {
  try {
    let complaints;

    if (req.user.role === "admin") {
      complaints = await Complaint.find()
        .populate("resident", "name email flatNumber")
        .sort({ createdAt: -1 });
    } else {
      complaints = await Complaint.find({
        resident: req.user.id
      }).sort({ createdAt: -1 });
    }

    res.status(200).json({
      success: true,
      complaints
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update Complaint Status
export const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Complaint status updated",
      complaint
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};