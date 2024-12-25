const school = require('../models/schoolSchema')
const principal = require('../models/principalSchema')

async function registerSchool(req , res){

  try {
    const Principal = req.principal

  const { name , address , contactNumber , establishedYear , academicYears , schoolEmail , schoolWebsite } = req.body

  if(!name || !address || !contactNumber || !academicYears || !schoolEmail ){
    return res.status(404).json({
      success : false,
      msg : "All fields are required"
    })
  }
  
  const findPrincipal = await principal.findById(Principal)

  if(!findPrincipal){
    return res.status(400).json({message: 'Invalid principal ID'})
  }

const NewSchool = await school.create({
  name , address , contactNumber , establishedYear , academicYears , schoolEmail , schoolWebsite , principal : findPrincipal._id
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



module.exports = registerSchool