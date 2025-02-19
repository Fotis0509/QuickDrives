const mysql = require("mysql2");

// **Σύνδεση με τη βάση δεδομένων**
const db = mysql.createConnection({
    host: "localhost",
    user: "root", 
    password: "fot02", 
    database: "quickdrives"
});

// **Έλεγχος σύνδεσης**
db.connect((err) => {
    if (err) {
        console.error("❌ Σφάλμα σύνδεσης στη βάση δεδομένων:", err);
    } else {
        console.log("✅ Συνδέθηκε επιτυχώς στη βάση δεδομένων!");
    }
});

module.exports = db;
