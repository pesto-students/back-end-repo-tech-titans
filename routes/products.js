const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductsByCategory,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../controllers/productController");

router.get("/", getAllProducts);
router.post("/create", createProduct);
router.get("/category/:categoryId", getProductsByCategory);
router.get("/:productId", getProductById);
router.put("/:productId", updateProductById);
router.delete("/:productId", deleteProductById);

module.exports = router;
