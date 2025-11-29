const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String, // We will encrypt this in Assignment 4
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});
module.exports = mongoose.model('User', UserSchema);