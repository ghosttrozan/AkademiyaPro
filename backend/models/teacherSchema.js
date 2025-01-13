const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    fullName: {
        firstName : {
            type: String,
            required: true,
            trim: true
        },
        lastName : {
            type: String,
            trim: true
        }
    },
    fatherName : {
        type: String,
        trim: true
    },
    email: {
        type: String,
    },
    contactNumber: {
        type: String,
        required: true,
        unique: true,
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
     },
    designation: {
        type: String, // e.g., "Primary Teacher", "Senior Teacher"
        required: true
    },
    joiningDate: {
        type: Date,
        default: Date.now
    },
    salary: {
        type: Number,
        required: true
    },
    classes: [
        {
          classId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Class'
          },
          className: String,
          section: String
        }
      ],      
    address: {
        type: String,
        trim: true,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    religion: {
        type: String,
    },
    education : {
        type: String,
    },
    birthDate : {
        type: Date,
    },
    password: {
        type: String,
        required: true,
        select:false,
    },
    profileImage: {
        type: String, // URL for the profile picture
    },
    subjects: [String], 
    attendance: {
    type: Map,
    of: Boolean,
  },
  role: {
    type: String,
    default: 'Teacher',
  },
  notes: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model('Teacher', teacherSchema);
