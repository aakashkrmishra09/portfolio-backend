const mongoose = require('mongoose');
const ContactSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String
});
module.exports = mongoose.model('Contact', ContactSchema);