const express = require("express");
const { updateMobileHandler } = require("../controllers/sessionHandler");

const route = express.Router();

route.post("/updatemobile", updateMobileHandler);

module.exports = route;
