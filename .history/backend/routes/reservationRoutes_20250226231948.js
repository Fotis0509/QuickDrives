const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const Reservation = require("../models/Reservation");

// 🔹 Δημιουργία κράτησης
router.post("/", verifyToken, async (req, res) => {
    try {
        const { car_id, full_name, email, phone, mobile, start_date, end_date, message } = req.body;
        const user_id = req.user.userId; // ✅ Παίρνουμε το user_id από το token

        const reservation = await Reservation.create({
            user_id,
            car_id,
            full_name,
            email,
            phone,
            mobile,
            start_date,
            end_date,
            message,
            total_price: 100, // 🔹 Χρειάζεται υπολογισμός με βάση την τιμή του αυτοκινήτου
        });

        res.status(201).json({ message: "Κράτηση ολοκληρώθηκε!", reservation });
    } catch (error) {
        res.status(500).json({ error: "Σφάλμα κατά την κράτηση" });
    }
});

// 🔹 Λήψη κρατήσεων του συνδεδεμένου χρήστη
router.get("/my-reservations", verifyToken, async (req, res) => {
    try {
        const reservations = await Reservation.findAll({ where: { user_id: req.user.userId } });
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error: "Σφάλμα κατά την ανάκτηση των κρατήσεων" });
    }
});

module.exports = router;
