const db = require("../database");
const ContactRequest = require("../models/ContactRequest"); // 🔹 Εισάγουμε το model

class ContactController {
    // **Αποστολή Μηνύματος**
    static sendMessage(req, res) {
        console.log("Received Data:", req.body); // ✅ Προσθέτουμε console.log για να δούμε τα δεδομένα που λαμβάνει το backend
    
        const { full_name, email, mobile, message } = req.body;
    
        if (!full_name || !email || !mobile || !message) {
            return res.status(400).json({ error: "Τα πεδία Ονοματεπώνυμο, Email, Κινητό και Μήνυμα είναι υποχρεωτικά!" });
        }
    
        const sql = "INSERT INTO contact_requests (full_name, email, phone, mobile, message) VALUES (?, ?, ?, ?, ?)";
        db.query(sql, [full_name, email, req.body.phone || "", mobile, message], (err, result) => {
            if (err) return res.status(500).json({ error: "Σφάλμα κατά την αποθήκευση του αιτήματος." });
    
            res.status(201).json({ message: "Το αίτημα στάλθηκε επιτυχώς!", request_id: result.insertId });
        });
    }
    

    // **Ανάκτηση όλων των αιτημάτων επικοινωνίας**
    static getAllMessages(req, res) {
        db.query("SELECT * FROM contact_requests", (err, results) => {
            if (err) return res.status(500).json({ error: "Σφάλμα κατά την ανάκτηση των μηνυμάτων." });

            res.json(results);
        });
    }
}

module.exports = ContactController;
