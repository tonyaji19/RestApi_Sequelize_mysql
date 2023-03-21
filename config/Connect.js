import Sequelize from "sequelize";
import mysql2 from "mysql2";
import * as dotenv from "dotenv";
dotenv.config();

const db = new Sequelize(
  process.env.DB_DATABASE || "sequelize_db",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  process.env.PORT || 9000,
  {
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
    dialectModule: mysql2,
  }
);

export default db;
