const sequelize = require("../connections/db/sequelize");
const { DataTypes } = require("sequelize");

const District = sequelize.define("District", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

module.exports = District;
