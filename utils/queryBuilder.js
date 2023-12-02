const { Op } = require("sequelize");

const generateWhereClause = (availability, category, minPrice, maxPrice) => {
  const whereClause = {};

  // Including availability clause
  if (availability?.length) {
    let operator;

    // If only one option is included
    if (typeof availability === "string") {
      operator = availability === "in_stock" ? Op.gt : Op.eq;
    } else {
      operator = Op.gte;
    }

    whereClause["stock"] = {
      [operator]: 0,
    };
  }

  // Including category
  if (category?.length) {
    whereClause["category_id"] = {
      [Op.in]: Array.isArray(category) ? category : [category],
    };
  }

  // Including price range
  if (minPrice && maxPrice) {
    whereClause["price"] = { [Op.between]: [minPrice, maxPrice] };
  } else if (minPrice) {
    whereClause["price"] = { [Op.gte]: minPrice };
  } else if (maxPrice) {
    whereClause["price"] = { [Op.lte]: maxPrice };
  }

  return whereClause;
};

const generateOrderByClause = (sortBy) => {
  let orderByClause = [];
  if (sortBy) {
    let [fieldName, order] = sortBy.split("_");
    orderByClause = [fieldName, order.toUpperCase()];
  }

  return orderByClause;
};

module.exports = { generateWhereClause, generateOrderByClause };
