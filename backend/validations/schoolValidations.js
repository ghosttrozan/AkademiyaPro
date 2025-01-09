const Joi = require('joi');

const schoolSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .required()
    .messages({
      'string.base': 'Name must be a string.',
      'string.min': 'Name must be at least 3 characters long.',
      'any.required': 'Name is a required field.',
    }),
  
  address: Joi.string()
    .min(10)
    .required()
    .messages({
      'string.base': 'Address must be a string.',
      'string.min': 'Address must be at least 10 characters long.',
      'any.required': 'Address is a required field.',
    }),
  
  contactNumber: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required()
    .messages({
      'string.base': 'Contact Number must be a string.',
      'string.pattern.base': 'Contact Number must be between 10 and 15 digits.',
      'any.required': 'Contact Number is a required field.',
    }),
  
  establishedYear: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear())
    .required()
    .messages({
      'number.base': 'Established Year must be a number.',
      'number.min': 'Established Year must not be earlier than 1900.',
      'number.max': `Established Year must not be later than ${new Date().getFullYear()}.`,
      'any.required': 'Established Year is a required field.',
    }),
  
  academicYears: Joi.array()
    .items(Joi.string())
    .messages({
      'array.base': 'Academic Years must be an array of strings.',
    }),
  
  schoolEmail: Joi.string()
    .email()
    .required()
    .messages({
      'string.base': 'School Email must be a string.',
      'string.email': 'School Email must be a valid email address.',
      'any.required': 'School Email is a required field.',
    }),
  
  schoolWebsite: Joi.string()
    .uri()
    .optional()
    .messages({
      'string.base': 'School Website must be a string.',
      'string.uri': 'School Website must be a valid URL.',
    }),
  
  logo: Joi.string()
    .uri()
    .optional()
    .messages({
      'string.base': 'Logo must be a string.',
      'string.uri': 'Logo must be a valid URL.',
    }),
  
  schoolType: Joi.string()
    .valid('Middle', 'Secondary', 'Senior Secondary')
    .required()
    .messages({
      'string.base': 'School Type must be a string.',
      'any.only': "School Type must be one of 'Middle', 'Secondary', or 'Senior Secondary'.",
      'any.required': 'School Type is a required field.',
    }),
  
  tagLine: Joi.string()
    .min(5)
    .required()
    .messages({
      'string.base': 'Tagline must be a string.',
      'string.min': 'Tagline must be at least 5 characters long.',
      'any.required': 'Tagline is a required field.',
    }),
});

const updateSchoolSchema = Joi.object({
  address: Joi.string().optional(),
  contactNumber: Joi.string().pattern(/^\d{10}$/).optional().messages({
    "string.pattern.base": "Contact number must be a valid 10-digit number.",
  }),
  logo: Joi.string().uri().optional().messages({
    "string.uri": "Logo must be a valid URL.",
  }),
  name: Joi.string().optional(),
  schoolEmail: Joi.string().email().optional().messages({
    "string.email": "School email must be a valid email address.",
  }),
  schoolType: Joi.string().valid('Middle', 'Secondary', 'Senior Secondary').optional().messages({
    "any.only": "School type must be 'Middle', 'Secondary', 'Senior Secondary'.",
  }),
  schoolWebsite: Joi.string().uri().optional().messages({
    "string.uri": "School website must be a valid URL.",
  }),
  tagLine: Joi.string().optional(),
});

module.exports = { schoolSchema , updateSchoolSchema };
