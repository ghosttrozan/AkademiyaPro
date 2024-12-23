const {verifyJWT} = require('../utils/authorizationJWT')

const verifyPrincipal = async (req , res , next) => {
  let token = req?.headers?.authorization?.replace("Bearer " , "")

  if (!token) {
    return res.status(400).json({
      success : false,
      message : "Please Sign in"
    })
  }
  // Verify the token and get the principal ID. If invalid, return an error response.
  try {
    let principal = await verifyJWT(token)
    if (!principal) {
      return res.status(400).json({
        success : false,
        message : "Invalid Token"
      })
    }
    req.principal = principal.id
    next()
  } catch (error) {
    return null
  }

}

const verifyTeacher = async (req , res , next) => {
  let token = req?.headers?.authorization?.replace("Bearer " , "")

  if (!token) {
    return res.status(400).json({
      success : false,
      message : "Please Sign in"
    })
  }
  // Verify the token and get the principal ID. If invalid, return an error response.
  try {
    let teacher = await verifyJWT(token)
    if (!teacher) {
      return res.status(400).json({
        success : false,
        message : "Invalid Token"
      })
    }
    req.teacher = teacher.id
    next()
  } catch (error) {
    return null
  }

}

module.exports = {verifyPrincipal , verifyTeacher}