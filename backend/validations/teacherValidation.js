const Joi = require('joi');

const teacherRegisterSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().optional(),
  email: Joi.string().email().required(),
  contactNumber: Joi.string().min(10).max(15).required(),
  subjects: Joi.array().items(Joi.string()).optional(),
  designation: Joi.string().required(),
  salary: Joi.number().min(0).required(),
  address: Joi.string().required(),
  gender: Joi.string().valid('Male', 'Female', 'Other').required(),
  password: Joi.string().min(6).required(),
  fatherName: Joi.string().optional(),
  religion: Joi.string().optional(),
  education: Joi.string().optional(),
  birthDate: Joi.date().optional(),
});

const updateTeacherSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().optional(),
  email: Joi.string().email().required(),
  contactNumber: Joi.string().min(10).max(15).required(),
  designation: Joi.string().required(),
  salary: Joi.number().min(0).required(),
  address: Joi.string().required(),
  education: Joi.string().optional(),
})

module.exports = { teacherRegisterSchema , updateTeacherSchema };