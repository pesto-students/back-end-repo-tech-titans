require("dotenv").config();
const app = require("./app.js");
const sequelizeDb = require("./database.js");

// const Customer = require("./models/customer.js");
// const Order = require("./models/orderModel.js");
// const OrderItem = require("./models/orderModel.js");
// const OrderAddress = require("./models/orderAddressModel.js");
// const Session = require("./models/Session.js");

(async () => {
  await sequelizeDb.sync();
})();

app.listen(process.env.PORT, () => {
  console.log(`Server started on port: ${process.env.PORT}`);
});
