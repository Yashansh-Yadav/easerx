const sequelize = require("../connections/db/sequelize");
const { DataTypes } = require("sequelize");

const ReceptionistProfile = sequelize.define("ReceptionistProfile", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.UUID, allowNull: false },
  assignedDoctorId: { type: DataTypes.UUID },
  shift: { type: DataTypes.STRING },
});

module.exports = ReceptionistProfile;