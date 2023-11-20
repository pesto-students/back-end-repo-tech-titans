const Sequelize = require("sequelize");
const sequelizeDb = require("../database");

const Category = sequelizeDb.define("categories", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  parent_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: "Category",
      key: "id",
    },
  },
});

Category.associate = (models) => {
  Category.hasMany(models.Category, { foreignKey: "parent_id" });
  Category.hasMany(models.Product, { foreignKey: "category_id" });
};

module.exports = Category;
