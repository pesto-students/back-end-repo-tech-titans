require("dotenv").config();
const port = process.env.PORT || 3000;
const express = require("express");
console.log("port", port);
console.log("process", process.env);

const app = new express();

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
