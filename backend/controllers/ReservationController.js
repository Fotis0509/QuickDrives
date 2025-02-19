const db = require("../database");

class ReservationController {
    // **Δημιουργία νέας κράτησης (με έλεγχο διαθεσιμότητας)**
    static createReservation(req, res) {
        console.log("Received Data:", req.body);
    
        const { user_id, car_id, full_name, email, phone, mobile, start_date, end_date, message } = req.body;
    
        if (!user_id || !car_id || !start_date || !end_date || !full_name || !email || !mobile) {
            return res.status(400).json({ error: "Όλα τα πεδία είναι υποχρεωτικά!" });
        }
    
        // Υπολογισμός ημερών ενοικίασης
        const startDate = new Date(start_date);
        const endDate = new Date(end_date);
        const rentalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)); // Μετατροπή ms σε ημέρες
    
        if (rentalDays <= 0) {
            return res.status(400).json({ error: "Η ημερομηνία λήξης πρέπει να είναι μετά την ημερομηνία έναρξης!" });
        }
    
        // **Ανάκτηση τιμής ενοικίασης του αυτοκινήτου από τη βάση**
        const getPriceQuery = "SELECT price_per_day FROM cars WHERE id = ?";
        
        db.query(getPriceQuery, [car_id], (err, results) => {
            if (err) return res.status(500).json({ error: "Σφάλμα κατά την ανάκτηση της τιμής του αυτοκινήτου." });
    
            if (results.length === 0) {
                return res.status(404).json({ error: "Το αυτοκίνητο δεν βρέθηκε." });
            }
    
            const pricePerDay = parseFloat(results[0].price_per_day);
            const total_price = (pricePerDay * rentalDays).toFixed(2); // Υπολογισμός συνολικού κόστους
    
            // **Εισαγωγή κράτησης στη βάση δεδομένων**
            const insertSql = `
                INSERT INTO reservations (user_id, car_id, full_name, email, phone, mobile, start_date, end_date, message, total_price) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
            db.query(insertSql, [user_id, car_id, full_name, email, phone, mobile, start_date, end_date, message, total_price], (err, result) => {
                if (err) return res.status(500).json({ error: "Σφάλμα κατά την εγγραφή της κράτησης." });
    
                res.status(201).json({ 
                    message: `Η κράτηση δημιουργήθηκε επιτυχώς! Συνολικό κόστος: ${total_price}€`,
                    reservation_id: result.insertId,
                    total_price
                });
            });
        });
    }    

    // **Ανάκτηση όλων των κρατήσεων (με πληροφορίες χρήστη και αυτοκινήτου)**
    static getAllReservations(req, res) {
        db.query("SELECT * FROM reservations", (err, results) => {
            if (err) return res.status(500).json({ error: "Σφάλμα στη βάση δεδομένων." });
    
            res.json(results);
        });
    }    

    // **Ανάκτηση κράτησης βάσει ID**
    static getReservationsByUser(req, res) {
        const userId = req.params.userId; // Παίρνουμε το userId από τη διαδρομή
    
        db.query("SELECT * FROM reservations WHERE user_id = ?", [userId], (err, results) => {
            if (err) {
                return res.status(500).json({ error: "Σφάλμα στη βάση δεδομένων." });
            }
    
            if (results.length === 0) {
                return res.status(404).json({ error: "Δεν βρέθηκαν κρατήσεις για αυτόν τον χρήστη." });
            }
    
            res.json(results);
        });
    }
    
    // **Ενημέρωση κράτησης**
    static updateReservation(req, res) {
        const reservationId = req.params.id;
        const { start_date, end_date, phone, message } = req.body;
    
        if (!start_date || !end_date || !phone) {
            return res.status(400).json({ error: "Τα πεδία ημερομηνιών και τηλεφώνου είναι υποχρεωτικά." });
        }
    
        const updateSql = `
            UPDATE reservations 
            SET start_date = ?, end_date = ?, phone = ?, message = ?
            WHERE id = ?`;
    
        db.query(updateSql, [start_date, end_date, phone, message, reservationId], (err, result) => {
            if (err) return res.status(500).json({ error: "Σφάλμα κατά την ενημέρωση της κράτησης." });
    
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Η κράτηση δεν βρέθηκε." });
            }
    
            res.json({ message: "Η κράτηση ενημερώθηκε επιτυχώς!" });
        });
    }    

    // **Διαγραφή κράτησης (μόνο αν ανήκει στον χρήστη)**
    static deleteReservation(req, res) {
        const reservationId = req.params.id; // Παίρνουμε το ID της κράτησης
    
        db.query("DELETE FROM reservations WHERE id = ?", [reservationId], (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Σφάλμα κατά τη διαγραφή της κράτησης." });
            }
    
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Η κράτηση δεν βρέθηκε." });
            }
    
            res.json({ message: "Η κράτηση διαγράφηκε επιτυχώς!" });
        });
    }

    // **Διαγραφή ΌΛΩΝ των κρατήσεων 
    static deleteAllReservations(req, res) {
        db.query("DELETE FROM reservations", (err, result) => {
            if (err) return res.status(500).json({ error: "Σφάλμα κατά τη διαγραφή όλων των κρατήσεων." });
    
            res.json({ message: "Όλες οι κρατήσεις διαγράφηκαν επιτυχώς!" });
        });
    }
    
}

module.exports = ReservationController;
