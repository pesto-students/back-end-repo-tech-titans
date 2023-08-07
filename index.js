require("dotenv").config();
const PORT = process.env.PORT || 3000;
const app = require("./app");

console.log("port", PORT);
console.log("process", process.env);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
