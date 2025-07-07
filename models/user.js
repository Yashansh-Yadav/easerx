const sequelize = require("../connections/db/sequelize");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "User",
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    phone: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM("patient", "doctor", "chemist", "receptionist"), allowNull: false },
    districtId: { type: DataTypes.INTEGER, allowNull: false },
    otp: DataTypes.STRING,
    otp_created_at: DataTypes.DATE,
    otp_attempts: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  {
    tableName: "Users",
  }
);

module.exports = User;
