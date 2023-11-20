const Sequelize = require("sequelize");
const sequelizeDb = require("../database");

const Product = sequelizeDb.define("products", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.DECIMAL(10),
    allowNull: false,
  },
  cloudinary_slug: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  category_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  stock: {
    type: Sequelize.INTEGER,
    defaultValue: 100,
    validate: {
      length: [1, 4],
    },
  },
});

Product.associate = (models) => {
  Product.belongsTo(models.Category, { foreignKey: "category_id" });
};

module.exports = Product;
