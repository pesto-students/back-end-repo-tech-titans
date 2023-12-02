const Product = require("../models/productModel");
const {
  generateWhereClause,
  generateOrderByClause,
} = require("../utils/queryBuilder");
const { literal, Op } = require("sequelize");

/**
 * Controller for creating a product in the database
 *
 */
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      status: 201,
      success: true,
      data: product,
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
 * Controller for returning the details of all products in the database
 *
 */
const getAllProducts = async (req, res) => {
  try {
    const {
      availability,
      category,
      sortBy,
      priceRangeMin: minPrice,
      priceRangeMax: maxPrice,
      pageNumber = 1,
      pageSize = 15,
    } = req.query;

    const whereClause = generateWhereClause(
      availability,
      category,
      minPrice,
      maxPrice
    );

    const orderByClause = generateOrderByClause(sortBy);

    const { count, rows: products } = await Product.findAndCountAll({
      attributes: [
        "id",
        "name",
        "description",
        "price",
        "cloudinary_slug",
        "category_id",
        [literal("stock > 0"), "in_stock"], // Computed column based on quantity
      ],
      where: whereClause,
      ...(orderByClause.length && { order: [orderByClause] }),
      limit: pageSize,
      offset: (pageNumber - 1) * pageSize,
    });

    res.status(200).json({
      status: 200,
      success: true,
      data: products,
      pagination: {
        currentPage: pageNumber,
        totalPages: Math.ceil(count / pageSize),
        totalRecords: count,
      },
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
 * Controller for returning the details of all products in a particular category in
 * the database
 */
const getProductsByCategory = async (req, res) => {
  try {
    const categoryId = parseInt(req.params.categoryId);
    const pageNumber = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 15;

    const { count, rows: products } = await Product.findAndCountAll({
      offset: (pageNumber - 1) * pageSize,
      limit: pageSize,
      where: {
        category_id: categoryId,
      },
    });

    res.status(200).json({
      status: 200,
      success: true,
      data: products,
      pagination: {
        currentPage: pageNumber,
        totalPages: Math.ceil(count / pageSize),
        totalRecords: count,
      },
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
 * Controller for returning the details of a specific product in the database by
 * its ID
 */
const getProductById = async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);

    const product = await Product.findByPk(productId);

    // Check for if product was not found
    if (!product) {
      return res.status(404).json({
        status: 404,
        success: false,
        error: "Product not found",
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      data: product,
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
 * Controller for updating the details of a specific product in the database by
 * its ID
 */
const updateProductById = async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    const productPayload = req.body;

    const product = await Product.findByPk(productId);

    // Check if product exists
    if (!product) {
      return res.status(404).json({
        status: 404,
        success: false,
        error: "Product not found",
      });
    }

    // Update product details
    await product.update(productPayload);

    res.status(200).json({
      status: 200,
      success: true,
      data: product,
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
 * Controller for deleting a product from the database by its ID
 */
const deleteProductById = async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);

    const product = await Product.findByPk(productId);

    // Check if product exists
    if (!product) {
      return res.status(404).json({
        status: 404,
        success: false,
        error: "Product not found",
      });
    }

    // Delete product
    await product.destroy();

    res.status(200).json({
      status: 200,
      success: true,
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

module.exports = {
  createProduct,
  getAllProducts,
  getProductsByCategory,
  getProductById,
  updateProductById,
  deleteProductById,
};
