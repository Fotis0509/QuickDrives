const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const Reservation = require("../models/Reservation");
const Car = require("../models/Car");

const router = express.Router();

// 🔹 Επιστροφή κρατήσεων του συνδεδεμένου χρήστη
router.get("/my-reservations", verifyToken, async (req, res) => {
    try {
        const reservations = await Reservation.findAll({
            where: { user_id: req.user.userId },
            include: [{ model: Car, attributes: ["brand", "model", "price_per_day", "image_url"] }]
        });

        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error: "❌ Σφάλμα κατά την ανάκτηση των κρατήσεων." });
    }
});

module.exports = router;
