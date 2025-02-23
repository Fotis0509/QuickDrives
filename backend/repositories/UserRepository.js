const User = require("../models/User");

class UserRepository {
  async findByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  async createUser(userData) {
    return await User.create(userData);
  }
}

module.exports = new UserRepository();
