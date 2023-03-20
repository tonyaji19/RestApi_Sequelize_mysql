import Sequelize from "sequelize";

require("dotenv").config();

const db = new Sequelize(
  process.env.DB_DATABASE || "sequelize_db",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
  }
);

export default db;
