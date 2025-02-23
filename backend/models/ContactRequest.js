const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ContactRequest = sequelize.define("ContactRequest", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  full_name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: true },
  mobile: { type: DataTypes.STRING, allowNull: false },
  message: { type: DataTypes.TEXT, allowNull: false },
}, { timestamps: true });

module.exports = ContactRequest;
