const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  establishedYear: {
    type: Number,
  },
  schoolType: {
    type: String,
    required: true,
    enum: ['Middle', 'Secondary', 'Senior Secondary'],
  },
  principal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Principal', // Reference to the Principal
    required: true,
    unique: true, // Ensures that there's only one principal per school
  },
  classes: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
  ],
  teachers: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  ],
  students: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  ],
  academicYears: {
    type: [String],
  },
  tagLine: {
    type: String,
    required: true,
  },
  schoolEmail: {
    type: String,
    required: true,
    unique: true, // Ensures that there's only one school with a unique email
  },
  schoolWebsite: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  logo: {
    type: String,
    default: null,
  }
});

const School = mongoose.model('School', schoolSchema);

module.exports = School;
