import { Sequelize } from "sequelize";
import db from "../config/Connect.js";

const { DataTypes } = Sequelize;
// const db = require("../config/Connect.js");

const Mahasiswa = db.define(
  "informatika",
  {
    nama: DataTypes.STRING(30),
    foto: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    jurusan: DataTypes.STRING,
    alamat: DataTypes.STRING,
    npm: DataTypes.FLOAT,
  },
  {
    freezeTableName: true,
  }
);

export default Mahasiswa;

(async () => {
  await db.sync();
})();
