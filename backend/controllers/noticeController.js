import Notice from "../models/Notice.js";

// Create Notice (Admin)
export const createNotice = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required"
      });
    }

    const notice = await Notice.create({
      title,
      description,
      category,
      postedBy: req.user.id
    });

    res.status(201).json({
      message: "Notice created successfully",
      notice
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Get All Notices
export const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find()
      .populate("postedBy", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      notices
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Delete Notice (Admin)
export const deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);

    if (!notice) {
      return res.status(404).json({
        message: "Notice not found"
      });
    }

    res.status(200).json({
      message: "Notice deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};