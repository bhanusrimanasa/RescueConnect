import Adoption from "../models/Adoption.js";

export const createAdoption = async (req, res) => {
  try {
    const adoption = await Adoption.create({
      ...req.body,
      rescuedBy: req.user._id,
    });

    res.status(201).json(adoption);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getAllAdoptions = async (req, res) => {
  try {
    const { search, location, status, animalType } = req.query;

    const filter = {};
    filter.status="Available";
    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (location) {
      filter.location = location;
    }

    if (status) {
      filter.status = status;
    }

    if (animalType) {
      filter.animalType = animalType;
    }
    
    const adoptions = await Adoption.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json(adoptions);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const updateAdoption = async (req, res) => {
  try {
    const adoption = await Adoption.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!adoption) {
      return res.status(404).json({
        message: "Adoption not found",
      });
    }

    res.status(200).json(adoption);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const deleteAdoption = async (req, res) => {
  try {
    const adoption = await Adoption.findByIdAndDelete(req.params.id);

    if (!adoption) {
      return res.status(404).json({
        message: "Adoption not found",
      });
    }

    res.status(200).json({
      message: "Adoption deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
export const getAdoptionById = async (req, res) => {
  try {
    const animal = await Adoption.findById(req.params.id)
      .populate("rescuedBy", "name email role");

    if (!animal) {
      return res.status(404).json({
        message: "Animal not found",
      });
    }

    res.status(200).json(animal);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};