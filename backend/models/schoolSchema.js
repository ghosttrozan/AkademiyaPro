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
    required: true,
    default: 'data:image/jpeg;base64,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',
  },
});

const School = mongoose.model('School', schoolSchema);

module.exports = School;
