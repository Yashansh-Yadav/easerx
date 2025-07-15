const sequelize = require("../connections/db/sequelize");
const { DataTypes } = require("sequelize");

const ChemistProfile = sequelize.define("ChemistProfile", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  shopName: { type: DataTypes.STRING },
  licenseNumber: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING, allowNull: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: true },
});

module.exports = ChemistProfile;