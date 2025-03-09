const ContactRequest = require("../models/ContactRequest");

class ContactRequestRepository {
  async createRequest(requestData) {
    return await ContactRequest.create(requestData);
  }

  async getAllRequests() {
    return await ContactRequest.findAll();
  }

  async getRequestById(id) {
    return await ContactRequest.findByPk(id);
  }

  async deleteRequest(id) {
    return await ContactRequest.destroy({ where: { id } });
  }
}

module.exports = new ContactRequestRepository();
