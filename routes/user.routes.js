const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');

// --- READ (GET) ---
// GET all users (excluding passwords)
router.get('/', controller.getAll);

// GET single user by ID
router.get('/:id', controller.getById);

// --- AUTHENTICATION (POST) ---
// POST /register (Handles user sign up / creation with password hashing)
router.post('/register', controller.create); 

// POST /signin (Handles user login / authentication with JWT generation)
router.post('/signin', controller.signin); 

// --- UPDATE (PUT) ---
// PUT update user by ID
router.put('/:id', controller.update);

// --- DELETE ---
// DELETE single user by ID
router.delete('/:id', controller.remove);

// DELETE all users (for development/testing)
router.delete('/', controller.removeAll);

module.exports = router;