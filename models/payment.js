const sequelize = require("../connections/db/sequelize");
const { DataTypes } = require("sequelize");

const Payment = sequelize.define("Payment", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.UUID, allowNull: false },
  appointmentId: { type: DataTypes.UUID },
  amount: { type: DataTypes.FLOAT },
  method: { type: DataTypes.ENUM("online", "offline") },
  status: { type: DataTypes.STRING },
});

module.exports = Payment;
