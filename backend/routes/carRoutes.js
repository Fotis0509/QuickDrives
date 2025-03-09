const express = require("express");
const router = express.Router();
const sequelize = require("../config/database");
const Car = require("../models/Car");

// **Λήψη όλων των αυτοκινήτων**
router.get("/", async (req, res) => {
  try {
    const cars = await Car.findAll();
    res.json(cars);
  } catch (error) {
    console.error("Σφάλμα φόρτωσης αυτοκινήτων:", error);
    res.status(500).json({ error: "Αποτυχία φόρτωσης αυτοκινήτων." });
  }
});

module.exports = router;
