const principal = require('../models/principalSchema')
const teacher = require('../models/teacherSchema')
const School = require('../models/schoolSchema')
const bcrypt = require('bcrypt')
const {generateJWT} = require('../utils/authorizationJWT')

async function registerPrincipal(req , res){

  try {

    const {
      name,
      email,
      password,
      contactNumber,
      gender
    } = req.body 

    if (!name||!gender||!email||!password||!contactNumber){
      return res.status(400).json({
        success : false,
        msg : "Please provide all required fields"
      })
    }
    const existingPrincipal = await principal.findOne({contactNumber})

    if (existingPrincipal) {
      return res.status(400).json({
        success : false,
        msg : "Contact number already exists"
      })
    }

    const hashedPassword = await bcrypt.hash(password , 10)

    const newPrincipal = await principal.create({
      name,
      email,
      gender,
      password : hashedPassword,
      contactNumber,
    })

    let token = await generateJWT({
      name : newPrincipal.name,
      contactNumber : newPrincipal.contactNumber,
      id : newPrincipal._id,
      school : newPrincipal.school
    })

    return res.status(200).json({
      success : true,
        msg : "Principal created successfully",
        principal : {
          _id : newPrincipal._id,
          name : newPrincipal.name,
          email : newPrincipal.email,
          contactNumber : newPrincipal.contactNumber,
          school : newPrincipal.school,
          token
        }
    })

  } catch (error) {
    return res.status(500).json({
      success : false,
      msg : "error occurred",
      error : error.message
    })
  }

}

async function getPrincipalById(req , res){
  try {
    const principalId = req.principal
    const Principal = await principal.findById(principalId)

  if(!Principal){
    return res.status(404).json({
      success : false,
      msg : "Principal not found"
    })
  }

  return res.status(200).json({
    success : true,
    principal : Principal
  })
  } catch (error) {
    return res.status(500).json({
      success : false,
      msg : "error occurred while getting principals",
      err : error.message
    })
  }

}

async function updatePrincipal(req, res) {
  try {
    const { name, email, password, gender, contactNumber } = req.body;

    const principalId = req.principal;
    const Principal = await principal.findById(principalId);

    if (!Principal) {
      return res.status(404).json({
        success: false,
        msg: "Principal not found",
      });
    }

    // Check if the new contact number is already in use by another principal
    const existingPrincipal = await principal.findOne({ contactNumber });
    if (existingPrincipal && existingPrincipal._id.toString() !== principalId) {
      return res.status(400).json({
        success: false,
        msg: "Contact number already exists",
      });
    }

    let hashedPassword = Principal.password;  // Retain old password if not updating
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Update the principal data
    const updatedPrincipal = await principal.findByIdAndUpdate(
      principalId,
      {
        name,
        email,
        gender,
        password: hashedPassword,
        contactNumber,
      },
      { new: true } // Ensures the updated document is returned
    );

    // Generate a token if necessary (example, using JWT)
    const token = await generateJWT({
      name : updatedPrincipal.name,
      contactNumber : updatedPrincipal.contactNumber,
      id : updatedPrincipal._id,
    })

    return res.status(200).json({
      success: true,
      msg: "Principal updated successfully",
      principal: {
        _id: updatedPrincipal._id,
        name: updatedPrincipal.name,
        email: updatedPrincipal.email,
        contactNumber: updatedPrincipal.contactNumber,
        school: updatedPrincipal.school,
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Error occurred while updating principal",
      err: error.message,
    });
  }
}


async function loginPrincipal(req , res){

  try {

    const {email , password} = req.body

    const Principal = await principal.findOne({email}).select('+password')

    if (!Principal) {
      return res.status(400).json({
        success : false,
        msg : "Principal not found"
      })
    }

    const isMatch = await bcrypt.compare(password, Principal.password)

    if (!isMatch) {
      return res.status(400).json({
        success : false,
        msg : "Invalid credentials"
      })
    }

    let token = await generateJWT({
      name : Principal.name,
      contactNumber : Principal.contactNumber,
      id : Principal._id,
      school : Principal.school
    })

    return res.status(200).json({
      success : true,
      msg : "Logged in successfully",
      principal : {
        _id : Principal._id,
        name : Principal.name,
        email : Principal.email,
        contactNumber : Principal.contactNumber,
        school : Principal.school,
        token
      }
    })

  } catch (error) {
    return res.status(400).json({
      success : false,
      msg : "error occurred while logging in",
      error : error.message
    })
  }
}

async function registerNewTeacher(req , res){
  
  try {
    
  const Principal = req.principal

  const {school} = await principal.findById(Principal)

  if(!school){
    return res.status(400).json({
      success : false,
      msg : "School not found"
    })
  }

  const { firstName , lastName , email , contactNumber , subjects , designation , salary , address , gender , password , fatherName , religion , education , birthDate } = req.body

  if(!firstName || !contactNumber || !password || !designation || !salary || !address || !gender || !email){
    return res.status(400).json({
      success : false,
      msg : "Please provide all required fields"
    })
  }

  const hashedPassword = await bcrypt.hash(password , 10)

  const existingTeacher = await teacher.findOne({contactNumber})

  if(existingTeacher){
    return res.status(400).json({
      success : false,
      msg : "Contact number already exists"
    })
  }

  const newTeacher = await teacher.create({
    school,
    fullName : {
      firstName ,
      lastName
    },
    email,
    contactNumber,
    password : hashedPassword,
    subjects,
    designation,
    salary,
    address,
    gender,
    fatherName,
    religion, 
    education, 
    birthDate
  })

  const token = await generateJWT({
    name : newTeacher.name,
    contactNumber : newTeacher.contactNumber,
    id : newTeacher._id,
    school : newTeacher.school
  })

  await School.findByIdAndUpdate(school , { $push : {teachers : newTeacher._id}})

  return res.status(200).json({
    success : true,
    msg : "Teacher created successfully",
    teacher : newTeacher,
    token
  })
  } catch (error) {
    return res.status(500).json({
      success : false,
      msg : "error occurred",
      error : error.message
    })
  }

}

async function deleteTeacher(req , res){

    try {

    const Principal = await principal.findById(req.principal)

    const teacherId = req.params.id
    
    const Teacher = await teacher.findById(teacherId)

    if(!Teacher){
      return res.status(404).json({
        success : false,
        msg : "Teacher not found"
      })
    }

    if(Teacher.school.toString()!== Principal.school.toString()){
      return res.status(403).json({
        success : false,
        msg : "You are not authorized to delete this teacher"
      })
    }

    await teacher.findByIdAndDelete(teacherId)

    await School.findByIdAndUpdate(Teacher.school , { $pull : { teachers : teacherId}})

    return res.status(200).json({
      success : true,
      msg : "Teacher deleted successfully"
    })

    } catch (error) {
      return res.status(400).json({
        success : false,
        msg : "error occurred while deleting teacher",
        error : error.message
      })
    }
}

async function getTeachers(req , res){
  try {

    const Principal = await principal.findById(req.principal)

    if(!Principal){
      return res.status(404).json({
        success : false,
        msg : "Principal not found"
      })
    }

    const teachers = await teacher.find({school : Principal.school}).select('-password')

    return res.status(200).json({
      success : true,
      teachers
    })

  } catch (error) {
    return res.status(400).json({
      success : false,
      msg : "error occurred",
      error : error.message
    })
  }
}

async function getTeachersById(req , res){
  try {

    const Principal = await principal.findById(req.principal)

    const teacherId = req.params.id

    if(!Principal){
      return res.status(404).json({
        success : false,
        msg : "Principal not found"
      })
    }

    const Teacher = await teacher.findById(teacherId)

    if(!Teacher){
      return res.status(404).json({
        success : false,
        msg : "Teacher not found"
      })
    }

    return res.status(200).json({
      success : true,
      Teacher
    })

  } catch (error) {
    return res.status(400).json({
      success : false,
      msg : "error occurred",
      error : error.message
    })
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
  updatePrincipal
}