const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({

  className: {
    type: String,
    required: true,
    trim: true,
  },
  section: {
    type: String,
    trim: true,
  },
  monthlyFee: {
    type: Number,
    required: true,
    default: 0, // Default value for monthly fee
  },
  yearlyFee: {
    type: Number,
    required: true,
    default: 0, // Default value for yearly fee
  },
  feeDetails: {
    installmentCount: { type: Number, default: 1 }, // Number of installments allowed
    lateFee: { type: Number, default: 0 }, // Late fee penalty
    dueDate: { type: Date }, // Due date for fees
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School', // Reference to the School model
    required: true,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student', // Reference to the Student model
    },
  ],
  teacher: [
    {
      teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true,
      },
      teacherName: {
        type: String,
        required: true,
      },
    },
  ],
  subjects: [
    {
      name: {
        type: String,
        required: false, // Subject name is optional
        trim: true, // Trim whitespace
        default: '', // Allow empty strings by default
      },
    },
  ],
  announcements: [
    {
      title: { type: String, required: false }, // Title of the announcement
      content: { type: String, required: false }, // Content of the announcement
      date: { type: Date, default: Date.now }, // Date of the announcement
      expireAt: {
        type: Date,
        default: () => Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['active', 'archived'], // Define allowed values
    default: 'active',
  },
});

// Ensure announcements are removed after they expire
classSchema.index({ 'announcements.expireAt': 1 }, { expireAfterSeconds: 0 });

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
