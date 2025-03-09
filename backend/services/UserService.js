const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const UserRepository = require("../repositories/UserRepository");

class UserService {
  static async registerUser(userData) {
    const existingUser = await UserRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("Ο χρήστης υπάρχει ήδη.");
    }

    userData.password = await bcrypt.hash(userData.password, 10);
    return await UserRepository.createUser(userData);
  }

  static async loginUser(email, password) {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new Error("Λάθος email ή κωδικός.");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Λάθος email ή κωδικός.");
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, "secretkey", { expiresIn: "1h" });
    return { token, userId: user.id, role: user.role };
  }
}

module.exports = UserService;
