const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  uniqueId: String,
  name: String,
  image: String,
  email: String,
  mobile: String,
  gender: String,
  designation: String,
  course: String,
  createDate: Date
});

// Create and export the model
module.exports = mongoose.model('employees', employeeSchema);
