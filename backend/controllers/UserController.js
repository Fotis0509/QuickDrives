const UserService = require("../services/UserService");
const User = require("../models/User");

class UserController {
  static async register(req, res) {
    try {
      const user = await UserService.registerUser(req.body);
      res.status(201).json({ message: "Ο χρήστης δημιουργήθηκε!", user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const response = await UserService.loginUser(email, password);
      res.json(response);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  static async getUserProfile(req, res) {
    try {
      const user = await User.findByPk(req.user.userId, {
        attributes: { exclude: ["password"] },
      });

      if (!user) {
        return res.status(404).json({ error: "Ο χρήστης δεν βρέθηκε" });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Σφάλμα κατά την ανάκτηση του προφίλ" });
    }
  }

  async getAllUsers(req, res) {
    try {
        const users = await UserService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Σφάλμα κατά την ανάκτηση των χρηστών" });
    }
}

  static async deleteUser(req, res) {
    try {
      await UserService.deleteUser(req.params.id);
      res.json({ message: "Ο χρήστης διαγράφηκε επιτυχώς!" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = UserController;
