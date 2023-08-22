const express = require("express");
const {
  signupHandler,
  loginHandler,
  resetPasswordHandler,
} = require("../Controllers/authHandler");
const route = express.Router();

route.post("/signup", signupHandler);
route.post("/login", loginHandler);
route.post("/forgotpassword", resetPasswordHandler);

module.exports = route;
