const Category = require("../models/categoryModel");

/**
 * Controller for creating a category in the database
 *
 */
const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({
      status: 201,
      success: true,
      data: category,
    });
  } catch (error) {
    // Add logging here
    console.error(error);
    res.status(500).json({
      status: 500,
      sucess: false,
      error: "Internal Server Error",
    });
  }
};

/**
 * Controller for returning a list of all categories in the database
 *
 */
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      attributes: ["id", "name"],
    });
    res.status(200).json({
      status: 200,
      success: true,
      data: categories,
    });
  } catch (error) {
    // Add logging here
    console.error(error);
    res.status(500).json({
      status: 500,
      sucess: false,
      error: "Internal Server Error",
    });
  }
};

module.exports = { createCategory, getAllCategories };
