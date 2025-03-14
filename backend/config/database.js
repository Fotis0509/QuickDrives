const { Sequelize } = require("sequelize");
require("dotenv").config(); // ✅ Φόρτωσε τις περιβαλλοντικές μεταβλητές

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  logging: false, // ✅ Απενεργοποίηση των logs για καθαρότερο output
  dialectOptions: {
    charset: "utf8mb4", // ✅ Επιδιόρθωση του cesu8 encoding error
  },
});

sequelize.authenticate()
  .then(() => console.log("✅ Σύνδεση με τη βάση μέσω Sequelize επιτυχής!"))
  .catch((error) => console.error("❌ Σφάλμα σύνδεσης:", error));

module.exports = sequelize;
