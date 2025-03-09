const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Reservation = require("./Reservation");

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { 
    type: DataTypes.ENUM("user", "admin"), 
    allowNull: false, 
    defaultValue: "user" // Προεπιλεγμένος ρόλος
  },
}, { timestamps: false });

// ✅ Σύνδεση του User με τις Κρατήσεις (Ένας χρήστης μπορεί να έχει πολλές κρατήσεις)
User.hasMany(Reservation, { as: "reservations", foreignKey: "user_id" });
Reservation.belongsTo(User, { foreignKey: "user_id" });

module.exports = User;
