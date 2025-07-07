const sequelize = require("../connections/db/sequelize");
const { DataTypes } = require("sequelize");

const Appointment = sequelize.define("Appointment", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  patientId: { type: DataTypes.UUID, allowNull: false },
  doctorId: { type: DataTypes.UUID, allowNull: false },
  scheduledDate: { type: DataTypes.DATEONLY, allowNull: false },
  status: { type: DataTypes.ENUM("pending", "accepted", "completed", "cancelled"), defaultValue: "pending" },
});

module.exports = Appointment;
