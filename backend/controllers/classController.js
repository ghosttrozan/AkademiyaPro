const Class = require('../models/classSchema')
const School = require('../models/schoolSchema')
const Teacher = require('../models/teacherSchema')
async function registerClass (req , res) {
  try {
    
    const {className , section , subjects , title , content  } = req.body

    const principalId = req.principal

    if(!className || !section || !subjects){
      return res.status(400).json({
        message: 'All fields are required'
      })
    }

    const school = await School.findOne({principal : principalId})

    if(!school){
      return res.status(400).json({
        message: 'School not found'
      })
    }

    const classExists = await Class.findOne({ className , section , school : school._id })

    if(classExists){
      return res.status(400).json({
        message: 'Class already exists'
      })
    }

    const classs = await Class.create({
      className , section , school : school._id , subjects ,
      announcements : {
        title , content
      }
    })

    await School.findByIdAndUpdate(school._id , {$push : {classes : classs._id}})

    return res.status(200).json({
      message: 'Class registered successfully',
      class: classs
    })


  } catch (error) {
    return res.status(400).json({
      message: error.message || 'An error occurred while registering the class'
    })
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

module.exports = {
  registerClass,
  getClass
}