const ContactRequestService = require("../services/ContactRequestService");

class ContactRequestController {
  async create(req, res) {
    try {
      const request = await ContactRequestService.createRequest(req.body);
      res.status(201).json({ message: "Το μήνυμα στάλθηκε επιτυχώς!", request });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const requests = await ContactRequestService.getAllRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const request = await ContactRequestService.getRequestById(req.params.id);
      if (!request) {
        return res.status(404).json({ error: "Το Contact Request δεν βρέθηκε." });
      }
      res.json(request);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const response = await ContactRequestService.deleteRequest(req.params.id);
      res.json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new ContactRequestController();
