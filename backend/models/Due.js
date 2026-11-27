import mongoose from "mongoose";

const dueSchema = new mongoose.Schema(
  {
    flatNumber: {
      type: String,
      required: true
    },

    resident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    amount: {
      type: Number,
      required: true
    },

    month: {
      type: String,
      required: true
    },

    year: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending"
    },

    paidAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

const Due = mongoose.model("Due", dueSchema);

export default Due;