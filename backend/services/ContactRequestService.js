const ContactRequestRepository = require("../repositories/ContactRequestRepository");

class ContactRequestService {
  async createRequest(requestData) {
    if (!requestData.full_name || !requestData.email || !requestData.mobile || !requestData.message) {
      throw new Error("Τα πεδία Ονοματεπώνυμο, Email, Κινητό και Μήνυμα είναι υποχρεωτικά!");
    }
    return await ContactRequestRepository.createRequest(requestData);
  }

  async getAllRequests() {
    return await ContactRequestRepository.getAllRequests();
  }

  async getRequestById(id) {
    return await ContactRequestRepository.getRequestById(id);
  }

  async deleteRequest(id) {
    const request = await ContactRequestRepository.getRequestById(id);
    if (!request) {
      throw new Error("Το Contact Request δεν βρέθηκε.");
    }
    await ContactRequestRepository.deleteRequest(id);
    return { message: "Το Contact Request διαγράφηκε επιτυχώς." };
  }
}

module.exports = new ContactRequestService();
