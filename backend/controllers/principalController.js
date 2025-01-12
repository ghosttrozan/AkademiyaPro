const principal = require('../models/principalSchema')
const teacher = require('../models/teacherSchema')
const School = require('../models/schoolSchema')
const bcrypt = require('bcrypt')
const {generateJWT} = require('../utils/authorizationJWT')
const { principalRegisterSchema, updatePrincipalSchema, loginSchema } = require('../validations/principalValidation')
const { teacherRegisterSchema, updateTeacherSchema } = require('../validations/teacherValidation')

async function registerPrincipal(req, res) {
  try {
    // Validate the incoming request data using Joi
    const { error } = principalRegisterSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        msg: error.details[0].message, // Send Joi's validation error message
      });
    }

    const { name, email, password, contactNumber, gender } = req.body;

    // Check if email or contact number already exists
    const existingPrincipalByEmail = await principal.findOne({ email });
    if (existingPrincipalByEmail) {
      return res.status(400).json({
        success: false,
        msg: 'Email is already registered',
      });
    }

    const existingPrincipalByContact = await principal.findOne({ contactNumber });
    if (existingPrincipalByContact) {
      return res.status(400).json({
        success: false,
        msg: 'Contact number already exists',
      });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new Principal
    const newPrincipal = await principal.create({
      name,
      email,
      gender,
      password: hashedPassword,
      contactNumber,
    });

    // Generate JWT Token for the new Principal
    const token = await generateJWT({
      name: newPrincipal.name,
      contactNumber: newPrincipal.contactNumber,
      id: newPrincipal._id,
      school: newPrincipal.school,
      role: newPrincipal.role
    });

    return res.status(201).json({
      success: true,
      msg: 'Principal created successfully',
      principal: {
        _id: newPrincipal._id,
        name: newPrincipal.name,
        email: newPrincipal.email,
        contactNumber: newPrincipal.contactNumber,
        school: newPrincipal.school,
        token,
      },
    });
  } catch (error) {
    console.error('Error creating principal:', error);
    return res.status(500).json({
      success: false,
      msg: 'Internal server error occurred',
      error: error.message,
    });
  }
}

async function getPrincipalById(req, res) {
  try {
    const principalId = req.principal // Get principal ID from the middleware 
    console.log(principalId)
    // Find the principal by ID
    const foundPrincipal = await principal.findById(principalId)

    if (!foundPrincipal) {
      return res.status(404).json({
        success: false,
        message: "Principal not found",
      })
    }

    // Return the principal information
    return res.status(200).json({
      success: true,
      principal: {
        _id: foundPrincipal._id,
        name: foundPrincipal.name,
        email: foundPrincipal.email,
        contactNumber: foundPrincipal.contactNumber,
        gender: foundPrincipal.gender,
        school: foundPrincipal.school,
        role: foundPrincipal.role,
        createdAt: foundPrincipal.createdAt,
      },
    })
  } catch (error) {
    console.error("Error fetching principal:", error) // Log error for debugging
    return res.status(500).json({
      success: false,
      message: "Error occurred while retrieving principal",
      error: error.message,
    })
  }
}


async function updatePrincipal(req, res) {
  try {
    // Validate the request body using Joi
    const { error } = updatePrincipalSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message, // Return the validation error message
      });
    }

    const principalId = req.principal;
    const { name, email, contactNumber, gender, password } = req.body;

    if (!name && !email && !contactNumber && !gender && !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one field to update"
      });
    }

    // Find the principal by ID
    const existingPrincipal = await principal.findById(principalId);

    if (!existingPrincipal) {
      return res.status(404).json({
        success: false,
        message: "Principal not found"
      });
    }

    // Update fields
    if (name) existingPrincipal.name = name;
    if (email) existingPrincipal.email = email;
    if (contactNumber) existingPrincipal.contactNumber = contactNumber;
    if (gender) existingPrincipal.gender = gender;
    if (password) {
      // Hash the new password if provided
      existingPrincipal.password = await bcrypt.hash(password, 10);
    }

    // Save the updated principal
    await existingPrincipal.save();

    return res.status(200).json({
      success: true,
      message: "Principal updated successfully",
      principal: {
        _id: existingPrincipal._id,
        name: existingPrincipal.name,
        email: existingPrincipal.email,
        contactNumber: existingPrincipal.contactNumber,
        gender: existingPrincipal.gender,
        school: existingPrincipal.school,
        role: existingPrincipal.role,
        createdAt: existingPrincipal.createdAt,
      }
    });
  } catch (error) {
    console.error("Error updating principal:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating principal",
      error: error.message,
    });
  }
}


async function loginPrincipal(req, res) {
  try {
    // Validate request body with Joi
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        msg: error.details[0].message,
      });
    }

    const { email, password } = req.body;

    // Find principal by email
    const Principal = await principal.findOne({ email }).select('+password');
    if (!Principal) {
      return res.status(404).json({
        success: false,
        msg: "Principal not found",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, Principal.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        msg: "Invalid credentials",
      });
    }

    // Generate JWT
    let token = await generateJWT({
      name: Principal.name,
      contactNumber: Principal.contactNumber,
      id: Principal._id,
      school: Principal.school,
      role: Principal.role,
    });

    // Send successful response
    return res.status(200).json({
      success: true,
      msg: "Logged in successfully",
      principal: {
        _id: Principal._id,
        name: Principal.name,
        email: Principal.email,
        contactNumber: Principal.contactNumber,
        school: Principal.school,
        token,
      },
    });
  } catch (error) {
    // Log error and send response
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      msg: "Error occurred while logging in",
      error: error.message,
    });
  }
}

async function registerNewTeacher(req, res) {
  try {
    const principalId = req.principal;
    // Fetch school associated with the principal
    const { school } = await principal.findById(principalId).select('school');
    if (!school) {
      return res.status(400).json({
        success: false,
        msg: "Associated school not found",
      });
    }

    // Validate the input
    const { error } = teacherRegisterSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        msg: error.details[0].message,
      });
    }

    const {
      firstName,
      lastName,
      email,
      contactNumber,
      subjects,
      designation,
      salary,
      address,
      gender,
      password,
      fatherName,
      religion,
      education,
      birthDate,
    } = req.body;

    // Check if teacher already exists by contact number
    const existingTeacher = await teacher.findOne({ contactNumber });
    if (existingTeacher) {
      return res.status(400).json({
        success: false,
        msg: "A teacher with this contact number already exists",
      });
    }

    const existingTeacherEmail = await teacher.findOne({ email});
    if (existingTeacherEmail) {
      return res.status(400).json({
        success: false,
        msg: "A teacher with this email already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new teacher
    const newTeacher = await teacher.create({
      school,
      fullName: {
        firstName,
        lastName,
      },
      email,
      contactNumber,
      password: hashedPassword,
      subjects,
      designation,
      salary,
      address,
      gender,
      fatherName,
      religion,
      education,
      birthDate,
    });

    // Generate JWT token
    const token = await generateJWT({
      name: `${newTeacher.fullName.firstName} ${newTeacher.fullName.lastName}`,
      contactNumber: newTeacher.contactNumber,
      id: newTeacher._id,
      school: newTeacher.school,
    });

    // Add the teacher's ID to the school's teacher list
    await School.findByIdAndUpdate(school, {
      $push: { teachers: newTeacher._id },
    });

    return res.status(201).json({
      success: true,
      msg: "Teacher registered successfully",
      teacher: newTeacher ,
      token,
    });
  } catch (error) {
    console.error("Error during teacher registration:", error);
    return res.status(500).json({
      success: false,
      msg: "An error occurred during teacher registration",
      error: error.message,
    });
  }
}

async function deleteTeacher(req, res) {
  try {
    const principalId = req.principal;
    const { id: teacherId } = req.params;

    // Fetch the Principal and ensure they exist
    const Principal = await principal.findById(principalId);
    if (!Principal) {
      return res.status(404).json({
        success: false,
        msg: "Principal not found",
      });
    }
    // Fetch the Teacher and ensure they exist
    const Teacher = await teacher.findById(teacherId);
    if (!Teacher) {
      return res.status(404).json({
        success: false,
        msg: "Teacher not found",
      });
    }

    // Verify if the Teacher belongs to the Principal's school
    if (Teacher.school.toString() !== Principal.school.toString()) {
      return res.status(403).json({
        success: false,
        msg: "You are not authorized to delete this teacher",
      });
    }

    // Delete the Teacher and update the School document
    await teacher.findByIdAndDelete(teacherId);
    await School.findByIdAndUpdate(Teacher.school, {
      $pull: { teachers: teacherId },
    });

    return res.status(200).json({
      success: true,
      msg: "Teacher deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "An error occurred while deleting the teacher",
      error: error.message,
    });
  }
}


async function getTeachers(req, res) {
  try {
    // Fetch the Principal by ID from the request
    const Principal = await principal.findById(req.principal);

    // Check if the Principal exists
    if (!Principal) {
      return res.status(404).json({
        success: false,
        msg: "Principal not found",
      });
    }

    // Fetch all teachers associated with the Principal's school, excluding passwords
    const teachers = await teacher.find({ school: Principal.school }).select("-password");

    // Respond with the list of teachers
    return res.status(200).json({
      success: true,
      teachers,
    });
  } catch (error) {
    // Handle unexpected errors
    return res.status(500).json({
      success: false,
      msg: "An error occurred while fetching teachers",
      error: error.message,
    });
  }
}


async function getTeachersById(req, res) {
  try {
    const principalId = req.principal;
    const teacherId = req.params.id;
    // Validate if the Principal exists
    const Principal = await principal.findById(principalId);
    if (!Principal) {
      return res.status(404).json({
        success: false,
        msg: "Principal not found",
      });
    }

    // Validate if the Teacher exists
    const Teacher = await teacher.findById(teacherId).select("-password");
    if (!Teacher) {
      return res.status(404).json({
        success: false,
        msg: "Teacher not found",
      });
    }

    // Ensure the Teacher belongs to the same school as the Principal
    if (Teacher.school.toString() !== Principal.school.toString()) {
      return res.status(403).json({
        success: false,
        msg: "You are not authorized to view this teacher's details",
      });
    }

    // Respond with the Teacher's details
    return res.status(200).json({
      success: true,
      teacher: Teacher,
    });
  } catch (error) {
    // Handle unexpected errors
    return res.status(500).json({
      success: false,
      msg: "An error occurred while fetching teacher details",
      error: error.message,
    });
  }
}

async function updateTeacher(req, res) {
  try {
    
    const teacherId = req.params.id

    const { error } = updateTeacherSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message, // Return the validation error message
      });
    }

    const principalId = req.principal;

    const { firstName, lastName , email, contactNumber, address , designation , education , salary } = req.body;

    // Find the principal by ID
    const Principal = await principal.findById(principalId);

    if (!Principal) {
      return res.status(404).json({
        success: false,
        message: "Principal not found"
      });
    }

    // Find the teacher by ID 
    const Teacher = await teacher.findById(teacherId);

    if (!Teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found"
      });
    }

    if (Teacher.school.toString()!== Principal.school.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this teacher"
      });
    }

    const existingTeacher = await teacher.findOne({
      $or: [
        { email: email },
        { contactNumber: contactNumber }
      ]
    });
    
    if (existingTeacher._id !== existingTeacher._id) {
      // Check which field caused the conflict
      if (existingTeacher.email === email) {
        return res.status(400).json({
          success: false,
          message: "Email already exists"
        });
      }
      
      if (existingTeacher.contactNumber === contactNumber) {
        return res.status(400).json({
          success: false,
          message: "Contact number already exists"
        });
      }
    }
    

    if (firstName) Teacher.firstName = firstName;
    if (lastName) Teacher.lastName = lastName;
    Teacher.fullName = {firstName: Teacher.firstName,lastName: Teacher.lastName} ;
    if (email) Teacher.email = email;
    if (contactNumber) Teacher.contactNumber = contactNumber;
    if (lastName) Teacher.lastName = lastName;
    if (address) Teacher.address = address;
    if (designation) Teacher.designation = designation;
    if (education) Teacher.education = education;
    if (salary) Teacher.salary = salary;
    
    // Save the updated teacher

    await Teacher.save();

    return res.status(200).json({
      success: true,
      message: "Teacher updated successfully",
      teacher: Teacher
    });
  } catch (error) {
    console.error("Error updating teacher:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating teacher",
      error: error.message,
    });
  }
}

module.exports = {
  registerPrincipal,
  getPrincipalById,
  loginPrincipal,
  registerNewTeacher,
  deleteTeacher,
  getTeachers,
  getTeachersById,
  updatePrincipal,
  updateTeacher
}