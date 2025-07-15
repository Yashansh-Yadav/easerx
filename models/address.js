const sequelize = require("../connections/db/sequelize");
const { DataTypes } = require("sequelize");

const Address = sequelize.define("Address", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false },
    addressLine: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
    state: { type: DataTypes.STRING },
    pincode: { type: DataTypes.STRING },
    latitude: { type: DataTypes.DECIMAL },
    longitude: { type: DataTypes.DECIMAL },
  });
module.exports = Address;




