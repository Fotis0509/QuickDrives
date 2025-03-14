const express = require("express");
const cors = require("cors");
const path = require("path");
const { sequelize } = require("./models");
const Reservation = require("./models/Reservation");
const Car = require("./models/Car");
const userRoutes = require("./routes/userRoutes");
const contactRoutes = require("./routes/contactRoutes");
const carRoutes = require("./routes/carRoutes");
const reservationRoutes = require("./routes/reservationRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/reservations", reservationRoutes);
app.use("/users", userRoutes);
app.use("/contact", contactRoutes);
app.use("/cars", carRoutes);

async function syncDatabase() {
    try {
        await sequelize.authenticate();
        console.log("✅ Σύνδεση με τη βάση δεδομένων επιτυχής!");

        await sequelize.sync({ alter: true }); // alter αντί για force ώστε να μην διαγράφονται τα δεδομένα
        console.log("✅ Η βάση δεδομένων είναι συγχρονισμένη!");
    } catch (error) {
        console.error("❌ Σφάλμα στη βάση:", error);
    }
}

if (process.env.NODE_ENV !== "test") {
    syncDatabase();
}


// **Αποτρέπουμε την εκκίνηση του server αν βρισκόμαστε σε TEST περιβάλλον**
if (process.env.NODE_ENV !== "test") {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`✅ Server running on http://localhost:${PORT}`);
    });
}

module.exports = app; // Εξάγουμε το app για τα tests
