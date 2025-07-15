const sequelize = require("../connections/db/sequelize");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "User",
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    phone: { type: DataTypes.STRING , allowNull: false},
    role: { type: DataTypes.ENUM("patient", "doctor", "chemist", "receptionist"), allowNull: false },
    otp:{ type: DataTypes.STRING, allowNull: true } ,
    otp_created_at:{ type: DataTypes.DATE, allowNull: true } ,
    otp_attempts: { type: DataTypes.INTEGER, defaultValue: 0 ,allowNull: true },
  },
  {
    tableName: "Users",
  }
);

module.exports = User;
