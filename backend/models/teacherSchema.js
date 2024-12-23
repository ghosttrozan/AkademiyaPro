const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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
    subjects: [
        {
            type: String,
            required: true
        }
    ],
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
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Class'
        }
    ],
    address: {
        type: String,
        trim: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    password: {
        type: String,
        required: true,
        select:false,
    },
    profileImage: {
        type: String, // URL for the profile picture
    },
    notes: {
        type: String,
        trim: true
    }
});

    module.exports = mongoose.model('Teacher', teacherSchema);
