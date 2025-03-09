const express = require("express");
const router = express.Router();
const ReservationController = require("../controllers/ReservationController");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

// ✅ Δημιουργία νέας κράτησης (χρήστης)
router.post("/", verifyToken, ReservationController.createReservation);

// ✅ Προβολή όλων των κρατήσεων (Admin)
router.get("/admin/reservations", verifyToken, verifyAdmin, ReservationController.getAllReservations);

// ✅ Διαγραφή κράτησης (Admin)
router.delete("/admin/reservations/:id", verifyToken, verifyAdmin, ReservationController.deleteReservation);

module.exports = router;
