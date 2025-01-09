const { verifyJWT } = require('../utils/authorizationJWT')

// Utility function to handle token verification
const verifyToken = async (token, res) => {
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Please Sign in"
    })
  }
  try {
    const user = await verifyJWT(token)
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token"
      })
    }
    return user
  } catch (error) {
    console.error("Error verifying token:", error)
    return res.status(500).json({
      success: false,
      message: "An error occurred while verifying the token"
    })
  }
}

const verifyPrincipal = async (req, res, next) => {
  const token = req?.headers?.authorization?.replace("Bearer ", "")
  const principal = await verifyToken(token, res)
  
  if (principal) {
    req.principal = principal.id
    next()
  }
}

const verifyTeacher = async (req, res, next) => {
  const token = req?.headers?.authorization?.replace("Bearer ", "")
  const teacher = await verifyToken(token, res)
  
  if (teacher) {
    req.teacher = teacher.id
    next()
  }
}

const verifyUser = async (req, res, next) => {
  const token = req?.headers?.authorization?.replace("Bearer ", "")
  const user = await verifyToken(token, res)

  if (user) {
    req.user = user.id
    next()
  }
}

module.exports = { verifyPrincipal, verifyTeacher, verifyUser }
