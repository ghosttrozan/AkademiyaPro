const Class = require('../models/classSchema')
const School = require('../models/schoolSchema')
const Teacher = require('../models/teacherSchema');
const validateClassData = require('../validations/classValidation');
async function registerClass(req, res) {
  try {
    // Joi Validation
    const { error } = validateClassData(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        msg: error.details.map((err) => err.message), // Return all Joi validation errors
      });
    }

    const { className, section, subjects, yearlyFee, title, content, teacher } = req.body;

    const principalId = req.principal;


    // Check if the school exists
    const school = await School.findOne({ principal: principalId });
    if (!school) {
      return res.status(400).json({
        message: 'School not found',
      });
    }

    // Check if class already exists
    const classExists = await Class.findOne({ className, section, school: school._id });
    
    if (classExists) {
      return res.status(400).json({
        message: 'Class already exists',
      });
    }
    const teacherData = await Teacher.findById(teacher);
    if(!teacherData){
      return res.status(400).json({
        message: 'Teacher not found',
      });
    }

    // Create the class document with announcements as an array of objects
    const classData = {
      className,
      section,
      school: school._id,
      subjects,
      yearlyFee,
      teacher: {
        teacherId: teacherData._id,
        teacherName: `${teacherData.fullName.firstName} ${teacherData.fullName.lastName}`, 
      },
      announcements: [
        {
          title,
          content,
        },
      ],
    };
    

    // Create the class
    const classs = await Class.create(classData);

    // Update the School document with the new class ID
    await School.findByIdAndUpdate(school._id, { $push: { classes: classs._id } });

    await Teacher.findByIdAndUpdate(
      teacher, 
      { 
        $push: { 
          classes: {
            classId: classs._id,
            className: classs.className,  // Assuming className is a property of the class document
            section: classs.section       // Assuming section is a property of the class document
          }
        } 
      }
    );    

    return res.status(200).json({
      message: 'Class registered successfully',
      class: classs,
    });
  } catch (error) {
    // Log the error for debugging purposes
    console.error(error);
    
    return res.status(400).json({
      message: error.message || 'An error occurred while registering the class',
    });
  }
}

async function getClass (req , res) {

  try {

    const {id} = req.params

    const classs = await Class.findById(id)
    
    if(!classs) {
      return res.status(404).json({
        message: 'Class not found'
      })
    }

    return res.status(200).json({
      class: classs
    })
    
  } catch (err) {
    return res.status(400).json({
      message: err.message || 'An error occurred while getting the class'
    })
  }
}

const getAllClasses = async (req, res) => {
  try {

    const principalId = req.principal;

    // Check if the school exists
    const school = await School.findOne({ principal: principalId });
    if (!school) {
      return res.status(400).json({
        message: 'School not found',
      });
    }

    // Fetch all classes
    const classes = await Class.find({school : school._id})

    if (classes.length === 0) {
      return res.status(404).json({
        message: 'No classes found',
      });
    }

    return res.status(200).json({
      message: 'Classes fetched successfully',
      classes,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'An error occurred while fetching classes',
    });
  }
};


module.exports = {
  registerClass,
  getClass,
  getAllClasses
}