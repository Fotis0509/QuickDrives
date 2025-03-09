const Reservation = require("../models/Reservation");
const Car = require("../models/Car");
const User = require("../models/User");

// 🔹 Δημιουργία νέας κράτησης
exports.createReservation = async (req, res) => {
    try {
        const { car_id, full_name, email, phone, mobile, start_date, end_date, message } = req.body;
        const userId = req.user.userId; // Ο authenticated χρήστης

        const car = await Car.findByPk(car_id);
        if (!car) return res.status(404).json({ error: "Το αυτοκίνητο δεν βρέθηκε" });

        const days = Math.ceil((new Date(end_date) - new Date(start_date)) / (1000 * 60 * 60 * 24));
        if (days <= 0) return res.status(400).json({ error: "Η ημερομηνία λήξης πρέπει να είναι μετά την ημερομηνία έναρξης." });

        const total_price = days * car.price_per_day;

        const reservation = await Reservation.create({
            user_id: userId,
            car_id,
            full_name,
            email,
            phone,
            mobile,
            start_date,
            end_date,
            total_price,
            message
        });

        res.status(201).json({ message: "Η κράτηση ολοκληρώθηκε!", reservation });
    } catch (error) {
        console.error("Σφάλμα κατά την κράτηση:", error);
        res.status(500).json({ error: "Αποτυχία δημιουργίας κράτησης" });
    }
};

// 🔹 Προβολή όλων των κρατήσεων (Admin)
exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.findAll({
            include: [
                { model: User, attributes: ["username", "email"] },
                { model: Car, attributes: ["brand", "model", "price_per_day"] }
            ]
        });
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error: "Σφάλμα κατά την ανάκτηση των κρατήσεων" });
    }
};

// 🔹 Διαγραφή κράτησης (Admin)
exports.deleteReservation = async (req, res) => {
    try {
        const { id } = req.params;
        await Reservation.destroy({ where: { id } });
        res.json({ message: "Η κράτηση διαγράφηκε!" });
    } catch (error) {
        res.status(500).json({ error: "Σφάλμα κατά τη διαγραφή της κράτησης" });
    }
};
