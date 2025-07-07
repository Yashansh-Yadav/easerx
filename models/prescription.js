const sequelize = require("../connections/db/sequelize");
const { DataTypes } = require("sequelize");

const Prescription = sequelize.define("Prescription", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  patientId: { type: DataTypes.UUID, allowNull: false },
  doctorId: { type: DataTypes.UUID, allowNull: false },
  chemistId: { type: DataTypes.UUID },
  rxCode: { type: DataTypes.STRING, unique: true },
  rxImage: { type: DataTypes.STRING }, // URL or path to image
});

module.exports = Prescription;
