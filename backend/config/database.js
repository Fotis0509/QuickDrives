const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("quickdrives", "root", "fot02", {
  host: "localhost",
  dialect: "mysql",
  logging: false, // Απενεργοποιεί τα logs για καθαρότερο output
});

sequelize.authenticate()
  .then(() => console.log("✅ Σύνδεση με τη βάση μέσω Sequelize επιτυχής!"))
  .catch((error) => console.error("❌ Σφάλμα σύνδεσης:", error));

module.exports = sequelize;
