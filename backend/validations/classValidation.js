const Joi = require('joi');

// Define Joi schema for validation
const validateClass = Joi.object({
  className: Joi.string().trim().required().messages({
    'string.empty': 'Class name is required.',
    'any.required': 'Class name is required.',
  }),
  section: Joi.string().trim().optional(),
  monthlyFee: Joi.number().min(0).optional().messages({
    'number.base': 'Monthly fee must be a number.',
    'number.min': 'Monthly fee cannot be negative.',
    'any.required': 'Monthly fee is required.',
  }),
  yearlyFee: Joi.number().min(0).required().messages({
    'number.base': 'Yearly fee must be a number.',
    'number.min': 'Yearly fee cannot be negative.',
    'any.required': 'Yearly fee is required.',
  }),
  students: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional()
    .messages({
      'string.pattern.base': 'Each student ID must be a valid MongoDB ObjectId.',
    }),
  teacher: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional()
    .messages({
      'string.pattern.base': 'Each teacher ID must be a valid MongoDB ObjectId.',
    }),
    subjects: Joi.array().items(
      Joi.object({
        name: Joi.string().optional(), 
      })
    ).optional(), // Making subjects optional
  announcements: Joi.array()
    .items(
      Joi.object({
        title: Joi.string().required().messages({
          'string.empty': 'Announcement title is required.',
          'any.required': 'Announcement title is required.',
        }),
        content: Joi.string().required().messages({
          'string.empty': 'Announcement content is required.',
          'any.required': 'Announcement content is required.',
        }),
        date: Joi.date().optional(),
        expireAt: Joi.date().optional(),
      })
    )
    .optional(),
  status: Joi.string().valid('active', 'archived').default('active').messages({
    'any.only': 'Status must be either "active" or "archived".',
  }),
});

// Export Joi validation function
const validateClassData = (data) => {
  return validateClass.validate(data, { abortEarly: false });
};

module.exports = validateClassData;
