const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const routes = require("./routes");

const app = express();
app.use(express.json());

app.use(cookieParser());

app.use(cors());

// Middleware for parsing JSON data
app.use(express.json());

// Middleware for parsing URL-encoded form data
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  next();
});

//Routes
app.use("/api/v1", routes);

module.exports = app;
