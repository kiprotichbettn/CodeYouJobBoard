const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  employer: { type: String, required: true },
  jobTitle: { type: String, required: true },
  pathway: String,
  language: String,
  salaryRange: String,
  contactPerson: String,
  location: String,
  deactivate: { type: Boolean, default: false },
  apply: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', jobSchema);
