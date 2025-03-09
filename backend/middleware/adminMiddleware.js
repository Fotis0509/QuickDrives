const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        console.log("✅ Ο χρήστης είναι admin:", req.user);
        next();
    } else {
        console.log("🚨 Πρόσβαση απορρίφθηκε: Δεν είναι admin!");
        return res.status(403).json({ error: "Μη εξουσιοδοτημένος" });
    }
};

module.exports = authorizeAdmin;
