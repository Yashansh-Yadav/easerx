const sequelize = require("../connections/db/sequelize");
const { DataTypes } = require("sequelize");

const QueueLog = sequelize.define("QueueLog", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  appointmentId: { type: DataTypes.UUID, allowNull: false },
  queueNumber: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.ENUM("waiting", "called", "done"), defaultValue: "waiting" },
});

module.exports = QueueLog;
