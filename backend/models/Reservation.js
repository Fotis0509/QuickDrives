const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Car = require("./Car");

const Reservation = sequelize.define("Reservation", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: "id" } },
  car_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Car, key: "id" } },
  full_name: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(100), allowNull: false },
  phone: { type: DataTypes.STRING(20), allowNull: true },
  mobile: { type: DataTypes.STRING(20), allowNull: false },
  start_date: { type: DataTypes.DATEONLY, allowNull: false },
  end_date: { type: DataTypes.DATEONLY, allowNull: false },
  message: { type: DataTypes.TEXT, allowNull: true },
  total_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
}, { timestamps: true });

Reservation.belongsTo(User, { foreignKey: "user_id" });
Reservation.belongsTo(Car, { foreignKey: "car_id" });

module.exports = Reservation;
