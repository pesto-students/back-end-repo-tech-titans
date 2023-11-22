const express = require("express");
const router = express.Router();
const {
  createCategory,
  getAllCategories,
} = require("../controllers/categoryController");

router.get("/", getAllCategories);
router.post("/create", createCategory);

module.exports = router;
