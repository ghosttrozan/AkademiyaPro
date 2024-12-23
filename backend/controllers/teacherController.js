const Teacher = require('../models/teacherSchema')
const bcrypt = require('bcrypt')
const { generateJWT } = require('../utils/authorizationJWT')
async function loginTeacher(req , res){

  const { contactnumber , password} = req.body

  try {
    
    const teacher = await Teacher.findOne(contactnumber).select('+password')

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' })
    }

    const isMatch = await bcrypt.compare(password, teacher.password)

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    let token = await generateJWT({
      name : teacher.name,
      contactNumber : teacher.contactNumber,
      id : teacher._id,
      school : teacher.school
    })

    res.json({
      message: 'Teacher logged in successfully',
      teacher: {
        name: teacher.name,
        contactNumber: teacher.contactNumber,
        id: teacher._id,
        school: teacher.school,
        subjects: teacher.subjects,
      },
      token,
    })

  } catch (error) {
    return res.status(400).json({
      success : false,
      msg : "error occurred while logging in",
      error : error.message
    })
  }

}

async function getTeachersById(req , res){
  try {

    const teacher = await Teacher.findById(req.teacher)

    if(!teacher){
      return res.status(404).json({
        success : false,
        msg : "teacher not found"
      })
    }

    return res.status(200).json({
      success : true,
      teacher
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
  loginTeacher,
  getTeachersById
}