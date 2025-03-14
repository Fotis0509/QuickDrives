const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
//const authenticate = require("../middleware/authMiddleware");
const Reservation = require("../models/Reservation");
const Car = require("../models/Car"); // Για να φέρουμε πληροφορίες αυτοκινήτου
const User = require("../models/User"); // Προσθέτουμε και το User model
const authorizeAdmin = require("../middleware/adminMiddleware"); // Νέο middleware
const { Op } = require("sequelize");

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

        const startDate = new Date(start_date);
        const endDate = new Date(end_date);

        if (startDate >= endDate) {
            return res.status(400).json({ error: "Η ημερομηνία λήξης πρέπει να είναι μετά την ημερομηνία έναρξης." });
        }

        console.log("🛠 Έλεγχος επικαλυπτόμενων κρατήσεων για car_id:", car_id);
        console.log("📅 Περίοδος: ", startDate.toISOString(), " έως ", endDate.toISOString());

        const overlappingReservations = await Reservation.findAll({
            where: {
                car_id: car_id,
                [Op.and]: [
                    { start_date: { [Op.lte]: endDate } },  // Ξεκινάει πριν ή μέσα στην περίοδο
                    { end_date: { [Op.gte]: startDate } }   // Τελειώνει μετά ή μέσα στην περίοδο
                ]
            },
        });
        
        

        console.log("🔍 Βρέθηκαν επικαλυπτόμενες κρατήσεις:", overlappingReservations.length);

        if (overlappingReservations.length > 0) {
            return res.status(400).json({ error: "🚫 Αυτό το αυτοκίνητο είναι ήδη κρατημένο στις επιλεγμένες ημερομηνίες!" });
        }

        // ✅ Αν δεν υπάρχει επικάλυψη, αποθηκεύουμε την κράτηση
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
        console.error("❌ Σφάλμα κατά την κράτηση:", error);
        res.status(500).json({ error: "Σφάλμα διακομιστή." });
    }
});


// 🔹 Επιστροφή όλων των κρατήσεων για τον Admin
router.get("/admin-reservations", verifyToken, authorizeAdmin, async (_, res) => {
    try {
        const reservations = await Reservation.findAll({
            include: [
                { model: Car, as: "car" },
                { model: User, as: "user", attributes: ["id", "username", "email"] }
            ],
            order: [["start_date", "ASC"]]
        });

        //console.log("🔍 Βρέθηκαν κρατήσεις:", reservations);
        res.json(reservations);
    } catch (error) {
        console.error("❌ Σφάλμα φόρτωσης κρατήσεων:", error);
        res.status(500).json({ error: "Σφάλμα φόρτωσης κρατήσεων" });
    }
});

// 🔹 Επιστροφή κρατήσεων του συνδεδεμένου χρήστη
router.get("/my-reservations", verifyToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const reservations = await Reservation.findAll({
            where: { user_id: userId },
            include: [{ model: Car, as: "car" }] // ✅ Προσθήκη του αυτοκινήτου
        });

        res.json(reservations);
    } catch (error) {
        console.error("❌ Σφάλμα κατά την ανάκτηση κρατήσεων:", error);
        res.status(500).json({ error: "Αποτυχία φόρτωσης κρατήσεων" });
    }
});

// 🔹 Ενημέρωση κρατήσεων του χρήστη
router.put("/:id", verifyToken, async (req, res) => {
    console.log("🔄 Ενημέρωση κράτησης ID:", req.params.id);
    console.log("📅 Νέα δεδομένα:", req.body);

    try {
        const reservation = await Reservation.findByPk(req.params.id);
        if (!reservation) {
            console.log("❌ Η κράτηση δεν βρέθηκε!");
            return res.status(404).json({ error: "Η κράτηση δεν βρέθηκε." });
        }

        // ✅ Ενημερώνουμε ημερομηνίες και τιμή
        await reservation.update({
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            total_price: req.body.total_price,
        });

        console.log("✅ Ενημερώθηκε επιτυχώς:", reservation);
        res.json({ message: "Η κράτηση ενημερώθηκε!", reservation });
    } catch (error) {
        console.error("❌ Σφάλμα κατά την ενημέρωση:", error);
        res.status(500).json({ error: "Αποτυχία ενημέρωσης κράτησης." });
    }
});

// 🔹 Διαγραφή κρατήσεων του χρήστη
router.delete("/:id", verifyToken, async (req, res) => {
    console.log("🗑 Διαγραφή κράτησης ID:", req.params.id);

    try {
        const deleted = await Reservation.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            console.log("❌ Η κράτηση δεν βρέθηκε!");
            return res.status(404).json({ error: "Η κράτηση δεν βρέθηκε." });
        }

        console.log("✅ Διαγράφηκε επιτυχώς!");
        res.json({ message: "Η κράτηση διαγράφηκε!" });
    } catch (error) {
        console.error("❌ Σφάλμα κατά τη διαγραφή:", error);
        res.status(500).json({ error: "Αποτυχία διαγραφής κράτησης." });
    }
});

module.exports = router;
