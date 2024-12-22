const mongoose = require('mongoose')

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
  principal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Principal', // Reference to the Principal
    required: true,
    unique: true, // Ensures that there's only one principal per school
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('School', schoolSchema);
