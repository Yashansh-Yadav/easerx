// models/ProfileImage.js
const { DataTypes } = require("sequelize");
const sequelize = require("../connections/db/sequelize");

const ProfileImage = sequelize.define("ProfileImage", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  imageData: {
    type: DataTypes.BLOB("long"),
    allowNull: false,
  },
  mimeType: {
    type: DataTypes.STRING,
    allowNull: false, // e.g., image/png, image/jpeg
  }
}, {
  timestamps: true,
});

module.exports = ProfileImage;
