const express = require('express');
const router = express.Router();
const controller = require('../controllers/contact.controller');
const checkAuth = require('../middlewares/auth'); // Middleware to check for valid JWT

// --- PUBLIC ROUTE (Allows Anyone to Submit a Message) ---
// POST new contact message
router.post('/', controller.create);

// --- PROTECTED ROUTES (checkAuth Middleware Required for Admin Actions) ---

// GET all contact messages (Requires authentication)
router.get('/', checkAuth, controller.getAll);

// GET single contact message by ID (Requires authentication)
router.get('/:id', checkAuth, controller.getById);

// PUT update contact message by ID (Requires authentication - kept for completeness)
router.put('/:id', checkAuth, controller.update);

// DELETE single contact message by ID (Requires authentication)
router.delete('/:id', checkAuth, controller.remove);

// DELETE all contact messages (Requires authentication - use cautiously)
router.delete('/', checkAuth, controller.removeAll);

module.exports = router;