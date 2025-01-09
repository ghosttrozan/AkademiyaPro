// validation/principalValidation.js
const Joi = require('joi');

const principalRegisterSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    'string.min': 'Name must be at least 3 characters long',
    'any.required': 'Name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters long',
    'any.required': 'Password is required',
  }),
  gender: Joi.string().valid('Male', 'Female').required().messages({
    'any.only': 'Gender must be either Male or Female',
    'any.required': 'Gender is required',
  }),
  contactNumber: Joi.string().length(10).pattern(/^[0-9]+$/).required().messages({
    'string.length': 'Contact number must be 10 digits long',
    'string.pattern.base': 'Contact number must contain only digits',
    'any.required': 'Contact number is required',
  }),
});

const updatePrincipalSchema = Joi.object({
  name: Joi.string().min(3).max(50).optional(),
  email: Joi.string().email().optional(),
  contactNumber: Joi.string().min(10).max(15).optional(),
  gender: Joi.string().valid('Male', 'Female').optional(),
  password: Joi.string().min(6).optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports = { principalRegisterSchema , updatePrincipalSchema , loginSchema };
