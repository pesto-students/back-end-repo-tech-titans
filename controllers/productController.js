const Product = require("../models/productModel");

/**
 * Controller for creating a product in the database
 *
 */
const createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
  thetealab_a9bv;
};

// Read all
const getAllProducts = async (req, res) => {
  const products = await Product.findAll();
  res.status(200).json({ message: "Product created!!" });
};

// Read category products
const getProductsByCategory = async (req, res) => {
  const products = await Product.findAll();
  res.status(200).json({ message: "Product created!!" });
};

// Read specific
const getProductById = (req, res) => {
  // res.status(200).json({ message: "Route working correctly" });
};

// Update specific
const updateProduct = (req, res) => {
  // res.status(200).json({ message: "Route working correctly" });
};

// Delete specfific
const deleteProduct = (req, res) => {
  // res.status(200).json({ message: "Route working correctly" });
};

module.exports = { createProduct, getAllProducts };
