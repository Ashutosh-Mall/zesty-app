import FoodItem from "../models/foodItem.model.js";
import Vendor from "../models/vendor.model.js";

export const createFood = async (req, res) => {
  try {
    const {image, name, price, category, description, isAvailable} = req.body;

    if (!image || !name || !price) {
      return res.status(400).json({message: "Input value missing"});
    }

    const userId = req.userId;
    console.log(userId)
    if (!userId) {
      return res.status(400).json({message: "userId missing"});
    }

    const vendor = await Vendor.findOne({userId});
    if (!vendor) {
      return res.status(404).json({message: "Vendor not found"});
    }

    const newFoodItem = new FoodItem({
      vendor: vendor._id,
      image,
      name,
      price,
      category,
      description,
      isAvailable,
    });

    await newFoodItem.save();

    return res.status(201).json({
      message: "Food item created successfully",
      food: newFoodItem,
    });
  } catch (error) {
    return res
      .status(500)
      .json({message: "food item not created", error: error.message});
  }
};

export const viewFood = async (req, res) => {
  try {
    const {id} = req.params;

    if (!id) {
      return res.status(400).json({message: "Food id missing"});
    }

    const food = await FoodItem.findById(id).populate("vendor");

    if (!food) {
      return res.status(404).json({message: "Food not found"});
    }

    return res.status(200).json({food});
  } catch (error) {
    return res.status(500).json({
      message: "Cannot fetch food",
      error: error.message,
    });
  }
};

export const updateFood = async (req, res) => {
  try {
    const {id} = req.params;

    const {image, name, price, category, description, isAvailable} = req.body;

    if (!image || !name || !price) {
      return res.status(400).json({message: "Input value missing"});
    }

    if (!id) {
      return res.status(400).json({message: "Food id missing"});
    }

    const updatedFood = await FoodItem.findByIdAndUpdate(
      id,
      {image, name, price, category, description, isAvailable},
      {new: true}
    );

    if (!updatedFood) {
      return res.status(404).json({message: "Food not found"});
    }

    return res.status(200).json({
      message: "Food updated successfully",
      food: updatedFood,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Update failed",
      error: error.message,
    });
  }
};

export const deleteFood = async (req, res) => {
  try {
    const {id} = req.params;

    if (!id) {
      return res.status(400).json({message: "Food id missing"});
    }

    const deletedFood = await FoodItem.findByIdAndDelete(id);

    if (!deletedFood) {
      return res.status(404).json({message: "Food not found"});
    }

    return res.status(200).json({
      message: "Food deleted successfully",
      food: deletedFood,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Delete failed",
      error: error.message,
    });
  }
};

export const viewAllFoods = async (req, res) => {
  try {
    const foods = await FoodItem.find();

    if (!foods.length) {
      return res.status(404).json({message: "No food items found"});
    }

    return res.status(200).json({ foods });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch foods",
      error: error.message,
    });
  }
};

export const viewVendorFoods = async (req, res) => {
  try {
    const userId = req.userId;

    const vendor = await Vendor.findOne({ userId });
    if (!vendor) {
      return res.status(403).json({ message: "Vendor not found" });
    }

    const foods = await FoodItem.find({ vendor: vendor._id });

    if (!foods.length) {
      return res.status(404).json({ message: "No food found for this vendor" });
    }

    return res.status(200).json({ foods });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch vendor foods",
      error: error.message,
    });
  }
};
