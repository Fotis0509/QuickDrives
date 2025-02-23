const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Car = sequelize.define("Car", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  brand: { type: DataTypes.STRING(50), allowNull: false },
  model: { type: DataTypes.STRING(50), allowNull: false },
  category: { type: DataTypes.STRING(50), allowNull: false },
  engine: { type: DataTypes.STRING(20), allowNull: true },  // 🔹 Προσθήκη engine
  horsepower: { type: DataTypes.INTEGER, allowNull: true }, // 🔹 Προσθήκη horsepower
  fuel_consumption: { type: DataTypes.STRING(20), allowNull: true }, // 🔹 Προσθήκη fuel_consumption
  fuel_type: { type: DataTypes.STRING(20), allowNull: true }, // 🔹 Προσθήκη fuel_type
  price_per_day: { type: DataTypes.DECIMAL(10,2), allowNull: false }, // 🔹 Τροποποίηση price_per_day
  summary: { type: DataTypes.TEXT, allowNull: false }, // 🔹 Προσθήκη summary
  image_url: { type: DataTypes.STRING(255), allowNull: true }, // 🔹 Προσθήκη image_url
  description: { type: DataTypes.TEXT, allowNull: true }, // 🔹 Προσθήκη description
}, { timestamps: true });

module.exports = Car;
