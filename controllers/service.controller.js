const Service = require('../models/service.model');

// GET all services
exports.getAll = async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET service by ID
exports.getById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ message: "Service not found" });
        res.json(service);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST new service
exports.create = async (req, res) => {
    try {
        const newService = new Service(req.body);
        const savedService = await newService.save();
        res.json(savedService);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// PUT update service
exports.update = async (req, res) => {
    try {
        const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedService) return res.status(404).json({ message: "Service not found" });
        res.json(updatedService);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE service
exports.remove = async (req, res) => {
    try {
        const deletedService = await Service.findByIdAndDelete(req.params.id);
        if (!deletedService) return res.status(404).json({ message: "Service not found" });
        res.json({ message: "Service deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE all services
exports.removeAll = async (req, res) => {
    try {
        await Service.deleteMany({});
        res.json({ message: "All services deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};