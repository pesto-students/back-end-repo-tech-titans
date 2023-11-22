require("dotenv").config();

module.exports = {
  HOST: process.env.RENDER_POSTGRES_HOST,
  PASSWORD: process.env.RENDER_POSTGRES_PASSWORD,
  USER: process.env.RENDER_POSTGRES_USER,
  DATABASE: process.env.RENDER_POSTGRES_DATABASE,
  DIALECT: "postgres",
  PORT: 5432,
};
