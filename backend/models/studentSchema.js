const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    dateOfBirth: { type: Date},
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true }, // Reference to the Class
    school: { type: Schema.Types.ObjectId, ref: 'School' , required: true }, // Reference to the School
    contactInfo: {
      phone: { type: String, required: true },
      email: { type: String, required: true , lowercase: true, match: /.+\@.+\..+/ },
    },
    address: {
      type: String,
    },
    profilePic: { type: String, default: '' }, 
    attendance: [
      {
        date: { type: Date },
        status: { type: String, enum: ["Present", "Absent", "Late"] },
      },
    ],
    parentContact: [
      {
        name: { type: String, required: true },
        relationship: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, lowercase: true, match: /.+\@.+\..+/ },
      },
    ],
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
