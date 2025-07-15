const sequelize = require("../connections/db/sequelize");
const { DataTypes } = require("sequelize");

const varification = sequelize.define("Varification", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.UUID, allowNull: false },
  verificationSource:{ type: DataTypes.STRING },
  verified:{ type: DataTypes.STRING },
  verifiedBy:{ type: DataTypes.STRING },
  verificationDate:{ type: DataTypes.DATE, allowNull: true },
});

module.exports = varification;