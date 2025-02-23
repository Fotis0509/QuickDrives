const bcrypt = require("bcrypt");

const newPassword = "admin"; // Νέος κωδικός
const saltRounds = 10;

bcrypt.hash(newPassword, saltRounds, (err, hash) => {
    if (err) {
        console.error("Σφάλμα στην κρυπτογράφηση:", err);
    } else {
        console.log("Νέος κρυπτογραφημένος κωδικός:", hash);
    }
});
