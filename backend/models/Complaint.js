import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    category: {
      type: String,
      enum: [
        "Electricity",
        "Water",
        "Cleaning",
        "Security",
        "Maintenance",
        "Other"
      ],
      default: "Other"
    },

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending"
    },

    resident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    flatNumber: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Complaint = mongoose.model("Complaint", complaintSchema);

export default Complaint;