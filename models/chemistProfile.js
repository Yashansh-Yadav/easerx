const sequelize = require("../connections/db/sequelize");
const { DataTypes } = require("sequelize");

const ChemistProfile = sequelize.define("ChemistProfile", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.UUID, allowNull: false },
  shopName: { type: DataTypes.STRING },
  licenseNumber: { type: DataTypes.STRING },
  address: { type: DataTypes.STRING },
});

module.exports = ChemistProfile;