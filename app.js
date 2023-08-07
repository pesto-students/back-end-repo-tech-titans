const index = require("./routes/index.js");
const express = require("express");
const app = express();

app.use("/", index);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

module.exports = app;
