const Project = require('../models/project.model');

exports.getAll = async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) { res.status(500).json(err); }
};

exports.getById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: "Not found" });
        res.json(project);
    } catch (err) { res.status(500).json(err); }
};

exports.create = async (req, res) => {
    try {
        console.log("Create Body:", req.body); // Debug Log
        const newProject = new Project(req.body);
        await newProject.save();
        res.status(201).json(newProject);
    } catch (err) { 
        console.error(err);
        res.status(500).json(err); 
    }
};

// --- FIX: Direct Update ---
exports.update = async (req, res) => {
    try {
        console.log(`Update ID: ${req.params.id}`); // Debug Log
        console.log("Update Body:", req.body);      // Debug Log

        // Remove _id from body to avoid immutable field error
        const { _id, ...updateData } = req.body;

        // Force update using Mongoose's direct command
        const updated = await Project.findByIdAndUpdate(
            req.params.id, 
            updateData, 
            { new: true } // Return the updated version
        );
        
        if (!updated) {
            return res.status(404).json({ message: "Project not found" });
        }
        
        console.log("Updated Result:", updated); // Debug Log
        res.json(updated);
    } catch (err) { 
        console.error("Update Error:", err);
        res.status(500).json({ message: err.message }); 
    }
};
// --------------------------

exports.remove = async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) { res.status(500).json(err); }
};

exports.removeAll = async (req, res) => {
    try {
        await Project.deleteMany({});
        res.json({ message: "All projects deleted" });
    } catch (err) { res.status(500).json(err); }
};