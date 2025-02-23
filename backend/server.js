const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const contactRoutes = require("./routes/contactRoutes");
const sequelize = require("./config/database");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/contact", contactRoutes);

// **Σύνδεση με βάση δεδομένων**
sequelize.sync().then(() => {
  console.log("✅ Η βάση δεδομένων είναι συγχρονισμένη!");
}).catch(err => {
  console.error("❌ Σφάλμα στη βάση:", err);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
