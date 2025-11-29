const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // Get token from header (Format: "Bearer <token>")
        const token = req.headers.authorization.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Add user data to request
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
};