const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const Reservation = require("../models/Reservation");

const router = express.Router();

// 🔹 Δημιουργία νέας κράτησης (ΜΟΝΟ αν ο χρήστης είναι συνδεδεμένος)
router.post("/", verifyToken, async (req, res) => {
    try {
        const { car_id, full_name, email, phone, mobile, start_date, end_date, message, total_price } = req.body;

        if (!req.user || !req.user.userId) {
            return res.status(403).json({ error: "❌ Δεν έχετε δικαίωμα για κράτηση. Παρακαλώ συνδεθείτε!" });
        }

        if (!total_price || total_price <= 0) {
            return res.status(400).json({ error: "Μη έγκυρη συνολική τιμή." });
        }

        const reservation = await Reservation.create({
            user_id: req.user.userId,
            car_id,
            full_name,
            email,
            phone,
            mobile,
            start_date,
            end_date,
            message,
            total_price,
        });

        res.status(201).json({ message: "✅ Η κράτηση ολοκληρώθηκε!", reservation });
    } catch (error) {
        res.status(500).json({ error: "❌ Σφάλμα κατά την κράτηση." });
    }
});

module.exports = router;
