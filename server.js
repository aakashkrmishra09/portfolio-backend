const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const createError = require('http-errors');
require('dotenv').config();

const app = express();

// 1. Enhanced CORS (Allow Frontend to connect)
app.use(cors());

// 2. Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // Logs requests to terminal

// 3. Database Connection (With Auto-Retry)
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1); // Stop app if DB fails
  }
};
connectDB();

// 4. Routes
app.get('/', (req, res) => {
  res.json({ message: "Welcome to My Portfolio application." });
});

app.use('/api/contacts', require('./routes/contact.routes'));
app.use('/api/projects', require('./routes/project.routes'));
app.use('/api/services', require('./routes/service.routes'));
app.use('/api/users', require('./routes/user.routes'));

// 5. Error Handling
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  console.error("Server Error:", err.message); // Log error to terminal
  res.status(err.status || 500);
  res.json({
    success: false,
    message: err.message
  });
});

// 6. Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});