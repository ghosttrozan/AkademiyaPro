const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/dotenv.config')

// Function to generate JWT token
async function generateJWT(payload) {
  try {
    const token = await jwt.sign(payload, JWT_SECRET, { expiresIn: '10h' });
    return { success: true, token };
  } catch (error) {
    console.log("Error generating JWT:", error.message);
    return { success: false, error: 'Error generating token' };
  }
}

// Function to verify JWT token
async function verifyJWT(token) {
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET); 
    return { success: true, decoded };
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      console.log("Token expired:", error.message);
      return { success: false, error: 'Token expired' };  // Specific error message for expired tokens
    }
    console.log("Error in verifyJWT:", error.message);
    return { success: false, error: 'Invalid token' };  // Generic error for invalid token
  }
}

// Function to decode JWT token
async function decodeJWT(token) {
  try {
    const decoded = await jwt.decode(token); 
    return { success: true, decoded };
  } catch (error) {
    console.log("Error in decodeJWT:", error.message);
    return { success: false, error: 'Error decoding token' };
  }
}

module.exports = {
  generateJWT,
  verifyJWT,
  decodeJWT
};
