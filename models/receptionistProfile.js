const sequelize = require("../connections/db/sequelize");
const { DataTypes } = require("sequelize");

const ReceptionistProfile = sequelize.define("ReceptionistProfile", {
  userId: { type: DataTypes.UUID, allowNull: false },
  shift: { type: DataTypes.STRING },
});

module.exports = ReceptionistProfile;