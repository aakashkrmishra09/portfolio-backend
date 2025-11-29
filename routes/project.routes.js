const express = require('express');
const router = express.Router();
const controller = require('../controllers/project.controller');
const checkAuth = require('../middlewares/auth'); // Middleware to check for valid JWT

// --- PUBLIC ROUTES (No Authentication Required) ---
// GET all projects
router.get('/', controller.getAll);

// GET single project by ID
router.get('/:id', controller.getById);

// --- PROTECTED ROUTES (checkAuth Middleware Required) ---

// POST new project (Requires authentication)
router.post('/', checkAuth, controller.create);

// PUT update project by ID (Requires authentication)
router.put('/:id', checkAuth, controller.update);

// DELETE single project by ID (Requires authentication)
router.delete('/:id', checkAuth, controller.remove);

// DELETE all projects (Requires authentication - primarily for testing)
router.delete('/', checkAuth, controller.removeAll);

module.exports = router;