import SuccessStory from "../models/successStoryModel.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

// Volunteer submits a success story
export const createSuccessStory = async (req, res) => {
  try {
    const { title, story, animalType, reportId } = req.body;

    if (!title || !story || !animalType || !reportId) {
      return res.status(400).json({
        message: "Title, story, animal type and report are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Rescued animal image is required",
      });
    }

    const imageUrl = await uploadToCloudinary(req.file.buffer);

    const successStory = await SuccessStory.create({
      title,
      story,
      animalType,
      report:reportId,
      volunteer: req.user._id,
      image: imageUrl,
      status: "Pending",
    });

    res.status(201).json({
      message: "Success story submitted for admin approval",
      successStory,
    });
  } catch (error) {
    console.error("CREATE SUCCESS STORY ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};


// Admin gets all pending stories
export const getPendingSuccessStories = async (req, res) => {
  try {
    const stories = await SuccessStory.find({
      status: "Pending",
    })
      .populate("volunteer", "name email")
      .populate("report");

    res.json(stories);
  } catch (error) {
    console.error("GET PENDING STORIES ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};


// Admin approves a story
export const approveSuccessStory = async (req, res) => {
  try {
    const story = await SuccessStory.findById(req.params.id);

    if (!story) {
      return res.status(404).json({
        message: "Success story not found",
      });
    }

    story.status = "Approved";
    story.approvedAt = new Date();

    await story.save();

    res.json({
      message: "Success story approved",
      story,
    });
  } catch (error) {
    console.error("APPROVE SUCCESS STORY ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};


// Admin rejects a story
export const rejectSuccessStory = async (req, res) => {
  try {
    const story = await SuccessStory.findById(req.params.id);

    if (!story) {
      return res.status(404).json({
        message: "Success story not found",
      });
    }

    story.status = "Rejected";

    await story.save();

    res.json({
      message: "Success story rejected",
      story,
    });
  } catch (error) {
    console.error("REJECT SUCCESS STORY ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};


// Public - approved success stories
export const getApprovedSuccessStories = async (req, res) => {
  try {
    const stories = await SuccessStory.find({
      status: "Approved",
    })
      .populate("volunteer", "name")
      .sort({ approvedAt: -1 });

    res.json(stories);
  } catch (error) {
    console.error("GET APPROVED STORIES ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};
export const getSuccessStoryById = async (req, res) => {
  try {
    const story = await SuccessStory.findOne({
      _id: req.params.id,
      status: "Approved",
    }).populate("volunteer", "name");

    if (!story) {
      return res.status(404).json({
        message: "Success story not found",
      });
    }

    res.json(story);
  } catch (error) {
    console.error("GET SUCCESS STORY ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};