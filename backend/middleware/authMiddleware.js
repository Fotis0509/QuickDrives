const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Αν χρησιμοποιείς Sequelize ORM

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({ error: "Δεν υπάρχει άδεια πρόσβασης" });
  }

  const token = authHeader.split(" ")[1];

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
      req.user = decoded; // Αποθηκεύουμε τα δεδομένα του χρήστη στο request
      next();
  } catch (error) {
      return res.status(401).json({ error: "Μη έγκυρο token" });
  }
};

const verifyAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.userId);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ error: "Δεν έχετε δικαίωμα πρόσβασης" });
    }
    next();
  } catch (err) {
    res.status(500).json({ error: "Σφάλμα κατά τον έλεγχο δικαιωμάτων" });
  }
};

module.exports = { verifyToken, verifyAdmin };

