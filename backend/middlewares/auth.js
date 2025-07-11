const { verifyJWT } = require('../utils/authorizationJWT');

// Utility function to handle token verification
const verifyToken = async (token) => {
  if (!token) {
    throw new Error("Please Sign in");
  }

  try {
    const { success, decoded, error } = await verifyJWT(token);

    if (!success) {
      throw new Error(error || "Invalid or expired token");
    }

    return decoded;
  } catch (error) {
    throw new Error(error.message || "An error occurred while verifying the token");
  }
};

// Middleware to verify specific roles
const verifyRole = (role) => async (req, res, next) => {
  const token = req?.headers?.authorization?.replace("Bearer ", "");
  try {
    
    const decodedUser = await verifyToken(token);
    console.log(decodedUser)

    // Check for specific role and attach to request object
    if (role === 'principal' && decodedUser.role === 'Principal') {
      req.principal = decodedUser.id;
    } else if (role === 'teacher' && decodedUser.role === 'Teacher') {
      req.teacher = decodedUser.id;
    } 
     else {
      return res.status(403).json({
        success: false,
        message: `Forbidden: You are not authorized as a ${role}`
      });
    }

    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({
      success: false,
      message: error.message || "Token verification failed"
    });
  }
};

const verifyStaff = async (req, res, next) => {
  const token = req?.headers?.authorization?.replace("Bearer ", "");
  try {
    const decodedUser = await verifyToken(token);
    console.log(decodedUser)

    // Check for specific role and attach to request object
    if (decodedUser.role === 'Principal' || decodedUser.role === 'Teacher') {
      req.Staff = decodedUser.id;
    } 
     else {
      return res.status(403).json({
        success: false,
        message: `Forbidden: You are not authorized as a Staff`
      });
    }

    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({
      success: false,
      message: error.message || "Token verification failed"
    });
  }
}
// Specific middlewares for principal, teacher
const verifyPrincipal = verifyRole('principal');
const verifyTeacher = verifyRole('teacher');

module.exports = { verifyPrincipal, verifyTeacher, verifyStaff };
