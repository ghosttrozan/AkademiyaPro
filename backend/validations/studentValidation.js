const Joi = require("joi");

// Validation schema for student
const studentValidationSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().optional(),
  address: Joi.string().optional(),
  gender: Joi.string().valid("Male", "Female", "Other").required(),
  dateOfBirth: Joi.date().max('now').messages({
    'date.max': 'Date of birth must be in the past'
  }),
  classId: Joi.string().required(),  // Assuming it's the ObjectId as a string
  className: Joi.string().required(),
  school: Joi.string().optional(),  // Assuming it's the ObjectId as a string
  contactInfo: Joi.object({
    phone: Joi.string().required(),
    email: Joi.string().email().required().lowercase(),
  }).required(),
  profilePic: Joi.string().optional().pattern(/^(data:image\/(png|jpg|jpeg);base64,)/).messages({
    'string.pattern.base': 'Invalid profile picture format'
  }),
  attendance: Joi.array().items(
    Joi.object({
      date: Joi.date().optional(),
      status: Joi.string().valid("Present", "Absent", "Late").optional(),
    })
  ).optional(),
  parentContact: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      relationship: Joi.string().required(),
      phone: Joi.string().required(),
      email: Joi.string().email().optional().lowercase(),
    })
  ).optional(),
});

const updateStudentValidationSchema = Joi.object({
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  address: Joi.string().optional(),
  gender: Joi.string().valid("Male", "Female", "Other").optional(),
  dateOfBirth: Joi.date().max('now').messages({
    'date.max': 'Date of birth must be in the past'
  }),
  classId: Joi.string().optional(),  // Assuming it's the ObjectId as a string
  school: Joi.string().optional(),  // Assuming it's the ObjectId as a string
  contactInfo: Joi.object({
    phone: Joi.string().optional(),
    email: Joi.string().email().optional().lowercase(),
  }).optional(),
  profilePic: Joi.string().optional().pattern(/^(data:image\/(png|jpg|jpeg);base64,)/).messages({
    'string.pattern.base': 'Invalid profile picture format'
  }),
  attendance: Joi.array().items(
    Joi.object({
      date: Joi.date().optional(),
      status: Joi.string().valid("Present", "Absent", "Late").optional(),
    })
  ).optional(),
  parentContact: Joi.array().items(
    Joi.object({
      name: Joi.string().optional(),
      relationship: Joi.string().optional(),
      phone: Joi.string().optional(),
      email: Joi.string().email().optional().lowercase(),
    })
  ).optional(),
});

module.exports = {studentValidationSchema , updateStudentValidationSchema};
