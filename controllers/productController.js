const Product = require("../models/productModel");

/**
 * Controller for creating a product in the database
 *
 */
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json({
      status: 201,
      success: true,
      data: product,
    });
  } catch (error) {
    // Add logging here
    console.error(error);
    res.json({
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
    const pageNumber = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 30;

    const { count, rows: products } = await Product.findAndCountAll({
      offset: (pageNumber - 1) * pageSize,
      limit: pageSize,
    });

    res.json({
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
    res.json({
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
    const pageSize = parseInt(req.query.pageSize) || 5;

    const { count, rows: products } = await Product.findAndCountAll({
      offset: (pageNumber - 1) * pageSize,
      limit: pageSize,
      where: {
        category_id: categoryId,
      },
    });

    res.json({
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
    res.json({
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
      return res.json({
        status: 404,
        success: false,
        error: "Product not found",
      });
    }

    res.json({
      status: 200,
      success: true,
      data: product,
    });
  } catch (error) {
    // Add logging here
    console.error(error);
    res.json({
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
      return res.json({
        status: 404,
        success: false,
        error: "Product not found",
      });
    }

    // Update product details
    await product.update(productPayload);

    res.json({
      status: 200,
      success: true,
      data: product,
    });
  } catch (error) {
    // Add logging here
    console.error(error);
    res.json({
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
      return res.json({
        status: 404,
        success: false,
        error: "Product not found",
      });
    }

    // Delete product
    await product.destroy();

    res.json({
      status: 200,
      success: true,
    });
  } catch (error) {
    // Add logging here
    console.error(error);
    res.json({
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
