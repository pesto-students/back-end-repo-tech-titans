const express = require("express");

const {
  getAllitems,
  createProduct,
} = require("../controllers/productController");

// const router = express.Router();
// const productRouter = express.Router();
// productRouter.route("/items").get(getAllitems);
// const app = express();-+
// app.use("/product", productRouter);

// router.route("/product");
// router.route("/items").get(getAllitems);
// router.route("/product/new").post(createProduct);

module.exports = router;
