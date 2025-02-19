const db = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

class UserController {
    // **Μέθοδος εγγραφής χρήστη**
    static registerUser(req, res) {
        const { name, email, password } = req.body;

        // **1. Βασικοί Έλεγχοι Εγκυρότητας**
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Όλα τα πεδία είναι υποχρεωτικά." });
        }
        if (!email.includes("@") || !email.includes(".")) {
            return res.status(400).json({ error: "Μη έγκυρη διεύθυνση email." });
        }
        if (password.length < 6) {
            return res.status(400).json({ error: "Ο κωδικός πρέπει να έχει τουλάχιστον 6 χαρακτήρες." });
        }

        // **2. Έλεγχος αν ο χρήστης υπάρχει ήδη**
        db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
            if (err) {
                console.error("❌ Σφάλμα στη βάση δεδομένων:", err);
                return res.status(500).json({ error: "Σφάλμα στη βάση δεδομένων." });
            }

            if (result.length > 0) {
                return res.status(400).json({ error: "Ο χρήστης υπάρχει ήδη." });
            }

            // **3. Κρυπτογράφηση Κωδικού**
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    console.error("❌ Σφάλμα κατά την κρυπτογράφηση:", err);
                    return res.status(500).json({ error: "Σφάλμα κρυπτογράφησης." });
                }

                // **4. Εισαγωγή του χρήστη στη βάση**
                db.query(
                    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
                    [name, email, hash],
                    (err, result) => {
                        if (err) {
                            console.error("❌ Σφάλμα κατά την εγγραφή χρήστη:", err);
                            return res.status(500).json({ error: "Σφάλμα εγγραφής." });
                        }
                        res.status(201).json({ message: "Εγγραφή επιτυχής!" });
                    }
                );
            });
        });
    }

    // **Μέθοδος σύνδεσης χρήστη**
    static loginUser(req, res) {
        const { email, password } = req.body;

        // **1. Βασικοί Έλεγχοι**
        if (!email || !password) {
            return res.status(400).json({ error: "Το email και ο κωδικός είναι υποχρεωτικά." });
        }

        // **2. Έλεγχος αν υπάρχει ο χρήστης**
        db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
            if (err) {
                console.error("❌ Σφάλμα στη βάση δεδομένων:", err);
                return res.status(500).json({ error: "Σφάλμα στη βάση δεδομένων." });
            }

            if (result.length === 0) {
                return res.status(401).json({ error: "Λάθος email ή κωδικός." });
            }

            const user = result[0];

            // **3. Σύγκριση Κωδικού με την κρυπτογραφημένη έκδοση**
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.error("❌ Σφάλμα κρυπτογράφησης:", err);
                    return res.status(500).json({ error: "Σφάλμα κατά την επαλήθευση κωδικού." });
                }

                if (!isMatch) {
                    return res.status(401).json({ error: "Λάθος email ή κωδικός." });
                }

                // **4. Δημιουργία JWT Token**
                const token = jwt.sign({ userId: user.id }, "secretkey", { expiresIn: "1h" });

                // **5. Επιστροφή επιτυχούς απάντησης**
                res.json({ token, userId: user.id, name: user.name });
            });
        });
    }

    // **Μέθοδος ανάκτησης προφίλ χρήστη (Protected Route)**
    static getUserProfile(req, res) {
        const userId = req.user.userId; // Το userId προέρχεται από το token μέσω middleware

        db.query("SELECT id, name, email FROM users WHERE id = ?", [userId], (err, result) => {
            if (err) {
                console.error("❌ Σφάλμα στη βάση δεδομένων:", err);
                return res.status(500).json({ error: "Σφάλμα στη βάση δεδομένων." });
            }

            if (result.length === 0) {
                return res.status(404).json({ error: "Ο χρήστης δεν βρέθηκε." });
            }

            res.json(result[0]);
        });
    }
}

module.exports = UserController;
