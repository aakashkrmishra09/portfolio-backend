const Contact = require('../models/contact.model');

// GET all contacts
exports.getAll = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET contact by ID
exports.getById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ message: "Contact not found" });
        res.json(contact);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST new contact
exports.create = async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        const savedContact = await newContact.save();
        res.json(savedContact);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// PUT update contact
exports.update = async (req, res) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedContact) return res.status(404).json({ message: "Contact not found" });
        res.json(updatedContact);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE contact
exports.remove = async (req, res) => {
    try {
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);
        if (!deletedContact) return res.status(404).json({ message: "Contact not found" });
        res.json({ message: "Contact deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE all contacts
exports.removeAll = async (req, res) => {
    try {
        await Contact.deleteMany({});
        res.json({ message: "All contacts deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};