/*
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Car = sequelize.define("Car", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  brand: { type: DataTypes.STRING, allowNull: false },
  model: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  engine: { type: DataTypes.STRING },
  horsepower: { type: DataTypes.INTEGER },
  fuel_consumption: { type: DataTypes.STRING },
  fuel_type: { type: DataTypes.STRING },
  price_per_day: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  summary: { type: DataTypes.TEXT, allowNull: false },
  image_url: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT }
}, { 
  timestamps: false // ✅ ΔΕΝ προσθέτει createdAt & updatedAt
});

module.exports = Car;
*/

const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class Car extends Model {}

Car.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    brand: { type: DataTypes.STRING, allowNull: false },
    model: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    engine: { type: DataTypes.STRING },
    horsepower: { type: DataTypes.INTEGER },
    fuel_consumption: { type: DataTypes.STRING },
    fuel_type: { type: DataTypes.STRING },
    price_per_day: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    summary: { type: DataTypes.TEXT, allowNull: false },
    image_url: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
  },
  {
    sequelize,
    modelName: "Car",
    tableName: "cars",
    timestamps: false,
  }
);

module.exports = Car;
