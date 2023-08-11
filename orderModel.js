const Sequelize = require("sequelize");
const sequelizeDb = require("../models/database");

const Order = sequelizeDb.define("orders", {
  orderId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },

  totalItems: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  totalPrice: {
    type: Sequelize.DECIMAL(38),
    allowNull: false,
  },
});

const OrderItem = sequelizeDb.define("orderItems", {
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  productName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  pricePerUnit: {
    type: Sequelize.DECIMAL(10),
    allowNull: false,
  },
  totalPrice: {
    type: Sequelize.DECIMAL(25),
    allowNull: false,
  },
});

// Define Associations
Order.hasMany(OrderItem, { foreignKey: "orderId" });
// OrderItem.belongsTo(Order, { foreignKey: "orderId" });

module.exports = { Order, OrderItem };
