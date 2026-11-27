import Due from "../models/Due.js";

// Admin: Create Maintenance Due
export const createDue = async (req, res) => {
  try {
    const { flatNumber, resident, amount, month, year } = req.body;

    const due = await Due.create({
      flatNumber,
      resident,
      amount,
      month,
      year
    });

    res.status(201).json({
      success: true,
      message: "Maintenance due created successfully",
      due
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Resident: View Own Dues
// Admin: View All Dues
export const getDues = async (req, res) => {
  try {
    let dues;

    if (req.user.role === "admin") {
      dues = await Due.find()
        .populate("resident", "name email flatNumber")
        .sort({ createdAt: -1 });
    } else {
      dues = await Due.find({
        resident: req.user.id
      }).sort({ createdAt: -1 });
    }

    res.status(200).json({
      success: true,
      dues
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Admin: Update Due Status
export const updateDueStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const due = await Due.findByIdAndUpdate(
      req.params.id,
      {
        status,
        paidAt: status === "Paid" ? new Date() : null
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!due) {
      return res.status(404).json({
        success: false,
        message: "Due not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Due status updated successfully",
      due
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};