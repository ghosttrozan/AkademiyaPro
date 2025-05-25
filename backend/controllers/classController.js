const Class = require('../models/classSchema')
const School = require('../models/schoolSchema')
const Teacher = require('../models/teacherSchema');
const validateClassData = require('../validations/classValidation');
const Student = require('../models/studentSchema');
const mongoose = require('mongoose');
// import mongoose from 'mongoose';
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
        message: 'Class not found',
        success: false
      })
    }

    return res.status(200).json({
      class: classs,
      success: true
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

const updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const { className, section, monthlyFee, yearlyFee, status, teacherId, teacherName } = req.body;

    // Validate required fields
    if (!className || !section) {
      return res.status(400).json({
        success: false,
        message: 'Class name and section are required fields'
      });
    }

    // Get existing class data first
    const existingClass = await Class.findById(id);
    if (!existingClass) {
      return res.status(404).json({
        success: false,
        message: 'Class not found'
      });
    }

    // Prepare update data
    const updateData = {
      className,
      section,
      monthlyFee: Number(monthlyFee) || 0,
      yearlyFee: Number(yearlyFee) || 0,
      status: status || 'active',
      teacher: []
    };

    // Handle teacher updates
    let previousTeacherId = null;
    if (existingClass.teacher.length > 0) {
      previousTeacherId = existingClass.teacher[0].teacherId;
    }

    if (teacherId && teacherName) {
      updateData.teacher = [{
        teacherId: new mongoose.Types.ObjectId(teacherId),
        teacherName
      }];
    }

    // Update the class document
    const updatedClass = await Class.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    // Update teacher-class relationships
    if (previousTeacherId && teacherId && previousTeacherId.toString() !== teacherId) {
      // Remove class from previous teacher
      await Teacher.findByIdAndUpdate(
        previousTeacherId,
        {
          $pull: {
            classes: {
              classId: existingClass._id
            }
          }
        }
      );
    }

    if (teacherId) {
      // Add class to new teacher
      await Teacher.findByIdAndUpdate(
        teacherId,
        {
          $addToSet: {
            classes: {
              classId: updatedClass._id,
              className: updatedClass.className,
              section: updatedClass.section
            }
          }
        }
      );
    }

    return res.status(200).json({
      success: true,
      message: 'Class updated successfully',
      class: updatedClass
    });

  } catch (error) {
    console.error('Error updating class:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while updating the class',
      error: error.message
    });
  }
};

const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. First find the class with all relationships
    const classToDelete = await Class.findById(id)
      .populate('students')
      .populate('teacher.teacherId')
      .populate('school');

    if (!classToDelete) {
      return res.status(404).json({
        success: false,
        message: 'Class not found'
      });
    }

    // 2. Delete all students in this class
    const studentIds = classToDelete.students.map(student => student._id);
    await Student.deleteMany({ _id: { $in: studentIds } });

    // 3. Remove class reference from all associated teachers
    const teacherUpdatePromises = classToDelete.teacher.map(teacher => 
      Teacher.findByIdAndUpdate(
        teacher.teacherId,
        { $pull: { classes: { classId: id } } },
        { new: true }
      )
    );

    // 4. Remove class reference from the school
    const schoolUpdatePromise = School.findByIdAndUpdate(
      classToDelete.school._id,
      { $pull: { classes: id } },
      { new: true }
    );

    // Execute all updates in parallel
    await Promise.all([...teacherUpdatePromises, schoolUpdatePromise]);

    // 5. Finally delete the class
    await Class.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: 'Class deleted successfully with all relationships cleaned up',
      data: {
        deletedStudentsCount: studentIds.length,
        updatedTeachersCount: teacherUpdatePromises.length,
        schoolUpdated: true
      }
    });

  } catch (error) {
    console.error('Error deleting class:', error);
    return res.status(500).json({
      success: false,
      message: 'Error deleting class and cleaning up relationships',
      error: error.message
    });
  }
};

module.exports = {
  registerClass,
  getClass,
  getAllClasses,
  updateClass,
  deleteClass
}