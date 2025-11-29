const express = require('express');
const router = express.Router();
const controller = require('../controllers/service.controller');
const checkAuth = require('../middlewares/auth'); // Middleware to check for valid JWT

// --- PUBLIC ROUTES (No Authentication Required) ---
// GET all services
router.get('/', controller.getAll);

// GET single service by ID
router.get('/:id', controller.getById);

// --- PROTECTED ROUTES (checkAuth Middleware Required) ---

// POST new service (Requires authentication)
router.post('/', checkAuth, controller.create);

// PUT update service by ID (Requires authentication)
router.put('/:id', checkAuth, controller.update);

// DELETE single service by ID (Requires authentication)
router.delete('/:id', checkAuth, controller.remove);

// DELETE all services (Requires authentication - primarily for testing)
router.delete('/', checkAuth, controller.removeAll);

module.exports = router;