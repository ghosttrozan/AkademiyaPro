const principal = require('../models/principalSchema')
const bcrypt = require('bcrypt')
const {generateJWT} = require('../utils/authorizationJWT')
async function registerPrincipal(req , res){

  try {

    const {
      name,
      email,
      password,
      contactNumber,
      school,
    } = req.body 

    if (!name,!email,!password,!contactNumber,!school){
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
      password : hashedPassword,
      contactNumber,
    })

    let token = await generateJWT({
      name : newPrincipal.name,
      contactNumber : newPrincipal.contactNumber,
      id : newPrincipal._id,
    })

    return res.status(200).json({
      success : true,
        msg : "User created successfully",
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

    const principalId = req.params.id

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

async function loginPrincipal(req , res){

  try {

    const {contactNumber , password} = req.body

    const Principal = await principal.findOne({contactNumber}).select('+password')

    if (!Principal) {
      return res.status(404).json({
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

module.exports = {
  registerPrincipal,
  getPrincipalById,
  loginPrincipal
}