const principal = require("../models/principalSchema");
const teacher = require("../models/teacherSchema");
const School = require("../models/schoolSchema");
const Class = require("../models/classSchema");
const Student = require("../models/studentSchema");
const bcrypt = require("bcrypt");
const { generateJWT } = require("../utils/authorizationJWT");
const {
  principalRegisterSchema,
  updatePrincipalSchema,
  loginSchema,
} = require("../validations/principalValidation");
const {
  teacherRegisterSchema,
  updateTeacherSchema,
} = require("../validations/teacherValidation");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const {
  studentValidationSchema,
  updateStudentValidationSchema,
} = require("../validations/studentValidation");

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

    const {
      name,
      email,
      password,
      contactNumber,
      gender,
      street,
      city,
      postalCode,
      state,
    } = req.body;

    // Check if email or contact number already exists
    const existingPrincipal = await principal.findOne({
      $or: [{ email }, { contactNumber }],
    });
    if (existingPrincipal) {
      return res.status(400).json({
        success: false,
        msg: "Email or Contact Number is already registered",
      });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    let imageUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url; // Get the Cloudinary URL
      fs.unlinkSync(req.file.path); // Remove the temporary file
    }

    // Create new Principal
    const newPrincipal = await principal.create({
      name,
      email,
      gender,
      password: hashedPassword,
      contactNumber,
      image: imageUrl,
      address: {
        street,
        city,
        state,
        postalCode,
      },
    });

    // Generate JWT Token for the new Principal
    const token = await generateJWT({
      name: newPrincipal.name,
      email: newPrincipal.email,
      id: newPrincipal._id,
      role: newPrincipal.role,
    });

    return res.status(201).json({
      success: true,
      msg: "Principal created successfully",
      principal: {
        _id: newPrincipal._id,
        name: newPrincipal.name,
        email: newPrincipal.email,
        contactNumber: newPrincipal.contactNumber,
        school: newPrincipal.school,
        address: newPrincipal.address,
        token,
        image: newPrincipal.image, // Include the image URL in the response
      },
    });
  } catch (error) {
    console.error("Error creating principal:", error);
    return res.status(500).json({
      success: false,
      msg: "Internal server error occurred",
      error: error.message,
    });
  }
}

async function getPrincipalById(req, res) {
  try {
    const principalId = req.principal; // Get principal ID from the middleware
    console.log(principalId);
    // Find the principal by ID
    const foundPrincipal = await principal.findById(principalId);

    if (!foundPrincipal) {
      return res.status(404).json({
        success: false,
        message: "Principal not found",
      });
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
    });
  } catch (error) {
    console.error("Error fetching principal:", error); // Log error for debugging
    return res.status(500).json({
      success: false,
      message: "Error occurred while retrieving principal",
      error: error.message,
    });
  }
}

async function updatePrincipal(req, res) {
  try {
    const principalId = req.principal;
    const { name, email, contactNumber, gender, password } = req.body;
    // Find the principal by ID
    const existingPrincipal = await principal.findById(principalId);

    if (!existingPrincipal) {
      return res.status(404).json({
        success: false,
        message: "Principal not found",
      });
    }

    let imageUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url; // Get the Cloudinary URL
      fs.unlinkSync(req.file.path); // Remove the temporary file
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

    const token = await generateJWT({
      name: existingPrincipal.name,
      contactNumber: existingPrincipal.contactNumber,
      id: existingPrincipal._id,
      school: existingPrincipal.school,
      role: existingPrincipal.role,
    });

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
        token,
        image: imageUrl,
      },
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
    const Principal = await principal.findOne({ email }).select("+password");
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
      email: Principal.email,
      id: Principal._id,
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
    const { school } = await principal.findById(principalId).select("school");
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

    const existingTeacherEmail = await teacher.findOne({ email });
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
      teacher: newTeacher,
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

    await Class.findByIdAndUpdate(
      Teacher.classes[0].classId,
      {
        $pull: {
          teacher: {
            teacherId: teacherId,
            teacherName: Teacher.fullName.firstName + " " + Teacher.fullName.lastName,
            id: Teacher._id,
          },
        },
      },
      { new: true }
    );
    

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
    const teachers = await teacher
      .find({ school: Principal.school })
      .select("-password");

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
    const teacherId = req.params.id;
    const principalId = req.principal;

    // Validate input
    const { error } = updateTeacherSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    // Verify principal exists and get school
    const Principal = await principal.findById(principalId);
    if (!Principal) {
      return res.status(404).json({
        success: false,
        message: "Principal not found",
      });
    }

    // Find and verify teacher
    const Teacher = await teacher.findById(teacherId);
    if (!Teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    // Verify authorization
    if (Teacher.school.toString() !== Principal.school.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to update this teacher",
      });
    }

    // Check for duplicate email/contact
    const { email, contactNumber } = req.body;
    if (email || contactNumber) {
      const existingTeacher = await teacher.findOne({
        $and: [
          { _id: { $ne: teacherId } },
          { $or: [
            ...(email ? [{ email }] : []),
            ...(contactNumber ? [{ contactNumber }] : [])
          ]}
        ]
      });

      if (existingTeacher) {
        const conflictField = existingTeacher.email === email ? 'email' : 'contact number';
        return res.status(400).json({
          success: false,
          message: `${conflictField} already in use`,
        });
      }
    }

    // Update fields
    const updates = {};
    if (req.body.firstName) updates['fullName.firstName'] = req.body.firstName;
    if (req.body.lastName) updates['fullName.lastName'] = req.body.lastName;
    if (email) updates.email = email;
    if (contactNumber) updates.contactNumber = contactNumber;
    // Add other fields...

    // Perform update
    const updatedTeacher = await teacher.findByIdAndUpdate(
      teacherId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    await Class.findByIdAndUpdate(
      Teacher.classes[0].classId,
        { teacher: { teacherName: updatedTeacher.fullName.firstName } },
    );

    return res.status(200).json({
      success: true,
      message: "Teacher updated successfully",
      teacher: updatedTeacher,
    });
  } catch (error) {
    console.error(`Error updating teacher :`, error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating teacher",
      error: error.message,
    });
  }
}

async function registerStudent(req, res) {
  console.log(req.body);
  try {
    try {
      req.body.contactInfo = JSON.parse(req.body.contactInfo || "{}");
      req.body.parentContact = JSON.parse(req.body.parentContact || "[]");
      req.body.address = JSON.parse(req.body.address || "{}");
    } catch (parseError) {
      return res.status(400).json({
        success: false,
        message: "Invalid JSON in contactInfo / parentContact / address",
      });
    }
    const { error } = studentValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message, // Return the validation error message
      });
    }

    const principalId = req.principal;

    const Principal = await principal.findById(principalId);

    if (!Principal) {
      return res.status(404).json({
        success: false,
        message: "Principal not found",
      });
    }

    const {
      firstName,
      lastName,
      gender,
      dateOfBirth,
      classId,
      contactInfo,
      profilePic,
      parentContact,
      address,
      className,
    } = req.body;

    const findClass = await Class.findById(classId);

    if (!findClass) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    const findSchool = await School.findById(Principal.school);

    if (!findSchool) {
      return res.status(404).json({
        success: false,
        message: "School not found",
      });
    }

    const student = new Student({
      firstName,
      lastName,
      gender,
      dateOfBirth,
      classId,
      className,
      contactInfo,
      profilePic,
      parentContact,
      address,
      school: Principal.school,
    });

    await student.save();

    findClass.students.push(student._id);
    findSchool.students.push(student._id);

    await findClass.save();
    await findSchool.save();

    // Add a success response
    return res.status(201).json({
      success: true,
      message: "Student registered successfully",
      student,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occurred while registering student",
      error: error.message,
    });
  }
}

async function updateStudent(req, res) {
  try {
    const studentId = req.params.id;
    const principalId = req.principal;

    // Initialize with empty objects if fields are missing
    req.body.contactInfo = req.body.contactInfo || '{}';
    req.body.parentContact = req.body.parentContact || '[]';
    // Safe JSON parsing with error handling
    try {
      req.body.contactInfo = typeof req.body.contactInfo === 'string' 
        ? JSON.parse(req.body.contactInfo) 
        : req.body.contactInfo;
      
      req.body.parentContact = typeof req.body.parentContact === 'string'
        ? JSON.parse(req.body.parentContact)
        : req.body.parentContact;
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      return res.status(400).json({
        success: false,
        message: "Invalid data format in contactInfo/parentContact/address",
        error: parseError.message
      });
    }

    // Validate the parsed data
    const { error } = updateStudentValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    // Rest of your existing logic...
    const Principal = await principal.findById(principalId);
    if (!Principal) {
      return res.status(404).json({ success: false, message: "Principal not found" });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    if (student.school.toString() !== Principal.school.toString()) {
      return res.status(403).json({ 
        success: false, 
        message: "Unauthorized to update this student" 
      });
    }

    // Update fields
    const updates = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      dateOfBirth: req.body.dateOfBirth,
      classId: req.body.classId,
      contactInfo: req.body.contactInfo,
      parentContact: req.body.parentContact,
      address: req.body.address,
      classId:student.classId,
    };

    Object.assign(student, updates);
    await student.save();

    return res.status(200).json({
      success: true,
      message: "Student updated successfully",
      student: student
    });

  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during update",
      error: error.message
    });
  }
}

async function deleteStudent(req, res) {
  try {
    const studentId = req.params.id;
    const principalId = req.principal;

    const Principal = await principal.findById(principalId);
    if (!Principal) {
      return res.status(404).json({
        success: false,
        message: "Principal not found",
      });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    if (student.school.toString() !== Principal.school.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this student",
      });
    }

    // Remove student from class
    const classDoc = await Class.findById(student.classId);
    if (classDoc) {
      classDoc.students = classDoc.students.filter(
        (id) => id.toString() !== studentId
      );
      await classDoc.save();
    }

    // Remove student from school
    const school = await School.findById(student.school);
    if (school) {
      school.students = school.students.filter(
        (id) => id.toString() !== studentId
      );
      await school.save();
    }

    // Delete the student
    await Student.findByIdAndDelete(studentId);

    return res.status(200).json({
      success: true,
      message: "Student deleted successfully and removed from class and school",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occurred while deleting student",
      error: error.message,
    });
  }
}

async function getAllStudents(req, res) {
  try {
    const principalId = req.principal;
    // Find the principal and verify they exist
    const Principal = await principal.findById(principalId);
    if (!Principal) {
      return res.status(404).json({
        success: false,
        message: "Principal not found",
      });
    }

    // Get all students for this principal's school
    const students = await Student.find({ school: Principal.school });

    return res.status(200).json({
      success: true,
      count: students.length,
      students,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occurred while fetching students",
      error: error.message,
    });
  }
}

async function getStudentById(req, res) {
  try {
    const staffId = req.Staff;
    const {id} = req.params
    const Principal = await principal.findById(staffId);
    if (!Principal) {
      const Teacher = await teacher.findById(staffId)
      if(!Teacher){
        return res.status(404).json({
          success: false,
          message: "Principal not found",
        });
      }
    }

    const student = await Student.findById(id)

    if(!student){
      return res.status(400).json({
        success:false,
        message:"student not found"
      })
    }

    return res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occurred while fetching student",
      error: error.message,
    });
  }
}

async function getAllStudentByClass(req, res) {
  try {
    const principalId = req.principal;
    const classId = req.params.id;

    // Find the principal and verify they exist
    const Principal = await principal.findById(principalId);
    if (!Principal) {
      return res.status(404).json({
        success: false,
        message: "Principal not found",
      });
    }

    // Find the class and verify it exists
    const findClass = await Class.findById(classId);
    if (!findClass) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    // Get all students for this class
    const students = await Student.find({
      school: Principal.school,
      classId: classId,
    });

    return res.status(200).json({
      success: true,
      count: students.length,
      students,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occurred while fetching students by class",
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
  updateTeacher,
  registerStudent,
  updateStudent,
  deleteStudent,
  getAllStudents,
  getAllStudentByClass,
  getStudentById
};
