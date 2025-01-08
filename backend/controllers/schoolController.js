const school = require('../models/schoolSchema')
const principal = require('../models/principalSchema')

async function registerSchool(req , res){

  try {
    const Principal = req.principal

  const { name , address , contactNumber , establishedYear , academicYears , schoolEmail , schoolWebsite , logo , schoolType , tagLine  } = req.body

  if(!name || !address || !contactNumber || !schoolEmail || !schoolType || !tagLine || !establishedYear ){
    return res.status(404).json({
      success : false,
      msg : "All fields are required"
    })
  }
  
  const findPrincipal = await principal.findById(Principal)

  if(!findPrincipal){
    return res.status(400).json({message: 'Invalid principal ID'})
  }

  if(findPrincipal.school){
    return res.status(400).json({message: 'Principal already registered a school'})
  }

const NewSchool = await school.create({
  name , address , contactNumber , establishedYear , academicYears , schoolEmail , schoolWebsite , principal : findPrincipal._id , logo , tagLine , schoolType
})

 await principal.findByIdAndUpdate(Principal , { $push : {
  school : NewSchool._id
}})

return res.status(200).json({
  success : true,
  message : "School registered successfully",
  school : NewSchool
})

  } catch (error) {
    return res.status(500).json({
      success : false,
      msg : "error occurred",
      error : error.message
    })
  }

}

async function getSchoolById(req , res){
  try {
  const Principal = req.principal
  const findPrincipal = await principal.findById(Principal)
  if(!findPrincipal){
    return res.status(400).json({message: 'Invalid principal ID'})
  }
const NewSchool = await school.findById(findPrincipal.school)

if(!NewSchool){
  return res.status(404).json({
    success : false,
    msg : "School not found",
  })
}
return res.status(200).json({
  success : true,
  message : "School fetched successfully",
  school : NewSchool
})
  } catch (error) {
    return res.status(500).json({
      success : false,
      msg : "error occurred",
      error : error.message
    })
  }
}

async function updateSchool(req , res){
  
  try {

    const { address , contactNumber , logo , name , schoolEmail , schoolType , schoolWebsite , tagLine} = req.body

    const schoolId = req.params.id
    const NewSchool = await school.findByIdAndUpdate(schoolId, {
      address , contactNumber , logo , name , schoolEmail , schoolType , schoolWebsite , tagLine
    } , {
      new: true, // Return the updated document
      runValidators: true // Run schema validation on updates
    })
  
  if(!NewSchool){
    return res.status(404).json({
      success : false,
      msg : "School not found",
    })
  }
  return res.status(200).json({
    success : true,
    message : "School Updated successfully",
    school : NewSchool
  })
    } catch (error) {
      return res.status(500).json({
        success : false,
        msg : "error occurred",
        error : error.message
      })
    }
}

module.exports = {registerSchool , getSchoolById , updateSchool}