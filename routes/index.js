const express = require("express");
const routes = express.Router();
const authRoutes = require("./auth");
const sessionRoutes = require("./session");
const productRoutes = require("./products");
const categoryRoutes = require("./categories");

routes.use("/auth", authRoutes);
routes.use("/session", sessionRoutes);
routes.use("/products", productRoutes);
routes.use("/categories", categoryRoutes);
module.exports = routes;
