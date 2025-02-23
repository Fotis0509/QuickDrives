const express = require("express");
const ContactRequestController = require("../controllers/ContactRequestController");

const router = express.Router();

router.post("/send", (req, res) => ContactRequestController.create(req, res));
router.get("/", (req, res) => ContactRequestController.getAll(req, res));
router.get("/:id", (req, res) => ContactRequestController.getById(req, res));
router.delete("/:id", (req, res) => ContactRequestController.delete(req, res));

module.exports = router;
