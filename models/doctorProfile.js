const sequelize = require("../connections/db/sequelize");
const { DataTypes } = require("sequelize");

const DoctorProfile = sequelize.define("DoctorProfile", {
  id: { type: DataTypes.UUID, allowNull: false ,primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: true },
  specialization: { type: DataTypes.STRING },
  startTime: { type: DataTypes.TIME },
  endTime: { type: DataTypes.TIME },
  daysAvailable: { type: DataTypes.ARRAY(DataTypes.STRING) },
  registrationNumber: { type: DataTypes.STRING , allowNull:false},
  medicalCouncilName: { type: DataTypes.STRING , allowNull:false},
  Aadhar: { type: DataTypes.STRING , allowNull:false},
});

module.exports = DoctorProfile;
