const express = require("express");
const router = express.Router();
const ReservationController = require("../controllers/ReservationController");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

// ✅ Προστατευμένα routes για διαχείριση κρατήσεων από admin
router.get("/admin/reservations", verifyToken, verifyAdmin, ReservationController.getAllReservations);
router.delete("/admin/reservations/:id", verifyToken, verifyAdmin, ReservationController.deleteReservation);

module.exports = router;
