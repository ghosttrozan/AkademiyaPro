const jwt = require('jsonwebtoken'); 

// Function to generate JWT token
function generateJWT(payload) {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });
    return token;
  } catch (error) {
    console.log("Error generating JWT:", error);
    return null;
  }
}

// Function to verify JWT token
function verifyJWT(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    return decoded;
  } catch (error) {
    console.log("Error in verifyJWT:", error);
    return null;
  }
}

// Function to decode JWT token
function decodeJWT(token) {
  try {
    const decoded = jwt.decode(token); 
    return decoded;
  } catch (error) {
    console.log("Error in decodeJWT:", error);
    return null;
  }
}

module.exports = {
  generateJWT,
  verifyJWT,
  decodeJWT
};