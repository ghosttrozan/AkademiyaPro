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
    subjects: [
        {
            type: String,
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    announcements: [
        {
            title: { type: String },
            content: { type: String },
            date: { type: Date, default: Date.now },
             expireAt: { 
            type: Date, 
            default: () => Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
            expires: 0 // Automatically delete when expired
        },
        },
    ],    
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
