const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");
const User = require("../models/User");
const Reservation = require("../models/Reservation");

// ✅ Αλλάξαμε το "register" σε "signup"
router.post("/signup", UserController.register);
router.post("/login", UserController.login);
router.get("/profile", verifyToken, UserController.getUserProfile);

// ✅ Διαδρομές μόνο για Admin
router.get("/admin/users", verifyToken, verifyAdmin, UserController.getAllUsers);
router.delete("/admin/users/:id", verifyToken, verifyAdmin, UserController.deleteUser);

// ✅ Route για το Dashboard
router.get("/dashboard", verifyToken, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.userId, {
            attributes: ["id", "username", "email", "role"], // Μη επιστροφή του password
            include: [
                {
                    model: Reservation,
                    as: "reservations", // Πρέπει να ταιριάζει με τη σχέση στη βάση δεδομένων
                }
            ]
        });

        if (!user) {
            return res.status(404).json({ error: "Ο χρήστης δεν βρέθηκε." });
        }

        res.json(user);
    } catch (error) {
        console.error("Σφάλμα Backend:", error);
        res.status(500).json({ error: "Σφάλμα κατά την ανάκτηση του προφίλ." });
    }
});

module.exports = router;
