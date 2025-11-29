const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- GET All Users (Excludes Passwords) ---
exports.getAll = async (req, res) => {
    try {
        // Use .select('-password') to ensure password hashes are never sent to the client
        const users = await User.find().select('-password'); 
        res.json(users);
    } catch (err) { 
        res.status(500).json({ message: err.message }); 
    }
};

// --- GET User by ID ---
exports.getById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        // RESTORING check for user existence
        if (!user) return res.status(404).json({ message: "User not found" }); 
        res.json(user);
    } catch (err) { 
        res.status(500).json({ message: err.message }); 
    }
};

// ------------------------------------
// --- AUTHENTICATION ROUTES (REGISTER / SIGN IN) ---
// ------------------------------------

// --- REGISTER (Sign Up) ---
exports.create = async (req, res) => {
    try {
        // 1. Encrypt password using bcryptjs
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        
        // 2. Create new user instance with the hashed password
        const newUser = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hashedPassword // Save the hashed password
        });

        // 3. Save the new user to the database
        const savedUser = await newUser.save();
        
        // Optional: Exclude password from response
        const userResponse = savedUser.toObject();
        delete userResponse.password;

        res.status(201).json(userResponse); // Use 201 Created status
    } catch (err) {
        // Handle common errors like duplicate email
        if (err.code === 11000) {
            return res.status(400).json({ message: "Email already exists." });
        }
        res.status(500).json({ message: err.message });
    }
};

// --- SIGN IN (Login) ---
exports.signin = async (req, res) => {
    try {
        // 1. Find user by email
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ message: "Auth failed: User not found" });
        }

        // 2. Compare password hash
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Auth failed: Wrong password" });
        }

        // 3. Generate JSON Web Token (JWT)
        const token = jwt.sign(
            { email: user.email, userId: user._id },
            process.env.JWT_SECRET, // Make sure JWT_SECRET is set in your .env file
            { expiresIn: "1h" }
        );

        // 4. Send token and user info
        res.status(200).json({
            token: token,
            expiresIn: 3600, // 1 hour in seconds
            userId: user._id
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ------------------------------------
// --- CRUD ROUTES (UPDATE / DELETE) ---
// ------------------------------------

// --- PUT update user ---
exports.update = async (req, res) => {
    try {
        // Note: For updating the password, you'd need separate logic to hash the new password.
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
        // RESTORING check for user existence
        if (!updatedUser) return res.status(404).json({ message: "User not found" }); 
        res.json(updatedUser);
    } catch (err) { 
        res.status(500).json({ message: err.message }); 
    }
};

// --- DELETE user ---
exports.remove = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        // RESTORING check for user existence
        if (!deletedUser) return res.status(404).json({ message: "User not found" }); 
        res.json({ message: "User deleted successfully" });
    } catch (err) { 
        res.status(500).json({ message: err.message }); 
    }
};

// --- DELETE all users ---
exports.removeAll = async (req, res) => {
    try {
        await User.deleteMany({});
        res.json({ message: "All users deleted" });
    } catch (err) { 
        res.status(500).json({ message: err.message }); 
    }
};