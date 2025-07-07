const sequelize = require("../connections/db/sequelize");
const { DataTypes } = require("sequelize");

const DoctorProfile = sequelize.define("DoctorProfile", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.UUID, allowNull: false },
  specialization: { type: DataTypes.STRING },
  startTime: { type: DataTypes.TIME },
  endTime: { type: DataTypes.TIME },
  daysAvailable: { type: DataTypes.ARRAY(DataTypes.STRING) },
});

module.exports = DoctorProfile;
