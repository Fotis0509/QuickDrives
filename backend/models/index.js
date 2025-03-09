const sequelize = require("../config/database");
const Car = require("./Car");
const Reservation = require("./Reservation");
const User = require("./User");

// ✅ Δημιουργία σχέσεων με μοναδικά alias
Car.hasMany(Reservation, { foreignKey: "car_id", as: "carReservations" });
Reservation.belongsTo(Car, { foreignKey: "car_id", as: "car" });

User.hasMany(Reservation, { foreignKey: "user_id", as: "userReservations" });
Reservation.belongsTo(User, { foreignKey: "user_id", as: "user" });

// ✅ Εξαγωγή των μοντέλων μαζί με τη σύνδεση
module.exports = { sequelize, User, Car, Reservation };
