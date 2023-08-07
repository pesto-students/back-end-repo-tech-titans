const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!!");
});

router.get("/:id", (req, res) => {
  res.send("Hello ID!!");
});

router.get("/dev", (req, res) => {
  res.send("Hello from DEV!!");
});

module.exports = router;
