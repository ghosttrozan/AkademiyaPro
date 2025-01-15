const school = require('../models/schoolSchema')
const principal = require('../models/principalSchema');
const { schoolSchema, updateSchoolSchema } = require('../validations/schoolValidations');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

async function registerSchool(req, res) {
  try {
    // Validate request body
    const { error, value } = schoolSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        details: error.details.map((detail) => detail.message), // Collect all validation errors
      });
    }

    const principalId = req.principal;

    // Check if the principal exists
    const findPrincipal = await principal.findById(principalId);
    if (!findPrincipal) {
      return res.status(404).json({
        success: false,
        message: "Principal not found.",
      });
    }

    // Check if the principal has already registered a school
    if (findPrincipal.school) {
      return res.status(400).json({
        success: false,
        message: "Principal has already registered a school.",
      });
    }

    const isEmailAlreadyRegistered = await school.findOne({schoolEmail: value.schoolEmail});

    if(isEmailAlreadyRegistered) {
      return res.status(400).json({
        success: false,
        details : [
          "Email already registered."
        ]
      });
    }

    // Create a new school
    const newSchool = await school.create({
      ...value, // Use validated fields from Joi
      principal: findPrincipal._id,
    });

    // Link the school to the principal
    findPrincipal.school = newSchool._id;
    await findPrincipal.save();

    return res.status(201).json({
      success: true,
      message: "School registered successfully.",
      school: newSchool,
    });
  } catch (error) {
    console.error("Error registering school:", error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred during school registration.",
      error: error.message,
    });
  }
}

async function getSchoolById(req, res) {
  try {
    const principalId = req.principal; 

    // Find the principal
    const findPrincipal = await principal.findById(principalId);
    if (!findPrincipal) {
      return res.status(400).json({
        success: false,
        message: 'Invalid principal ID',
      });
    }

    // Check if the principal has a school associated
    if (!findPrincipal.school) {
      return res.status(404).json({
        success: false,
        message: 'Principal has no associated school',
      });
    }

    // Find the school by its ID
    const schoolData = await school.findById(findPrincipal.school);
    if (!schoolData) {
      return res.status(404).json({
        success: false,
        message: 'School not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'School fetched successfully',
      school: schoolData,
    });
  } catch (error) {
    console.error('Error fetching school:', error.message);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching the school',
      error: error.message,
    });
  }
}


async function updateSchool(req, res) {
  try {
    const { id: schoolId } = req.params;
    const updateData = req.body;

    // Validate the request body using Joi
    const { error } = updateSchoolSchema.validate(updateData, { abortEarly: false });
    if (error) {
      // Return detailed Joi validation error messages
      return res.status(400).json({
        success: false,
        message: "Validation failed.",
        errors: error.details.map((err) => err.message),
      });
    }

    let imageUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url; // Get the Cloudinary URL
      fs.unlinkSync(req.file.path); // Remove the temporary file
    }
    
    updateData.logo = imageUrl

    // Update the school document
    const updatedSchool = await school.findByIdAndUpdate(
      schoolId,
      updateData,
      {
        new: true, // Return the updated document
        runValidators: true, // Enforce schema validation
      }
    );

    // If no school is found with the given ID
    if (!updatedSchool) {
      return res.status(404).json({
        success: false,
        message: "School not found.",
      });
    }

    // Successful response with the updated school
    return res.status(200).json({
      success: true,
      message: "School updated successfully.",
      school: updatedSchool,
    });
  } catch (error) {
    // Log the error and return a server error response
    console.error("Error updating school:", error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the school.",
      error: error.message,
    });
  }
}
module.exports = {registerSchool , getSchoolById , updateSchool}