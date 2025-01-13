require('dotenv').config(); 
const cloudinary = require('cloudinary').v2;
const { CLOUDINARY_CLOUD_NAME , CLOUDINARY_API_KEY , CLOUDINARY_API_SECRET } = require('../config/dotenv.config')
async function cloudinaryConfig() {
  try {
    cloudinary.config({
      cloud_name: CLOUDINARY_CLOUD_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET,
    });
    console.log("cloudinary configuration successfull")
  } catch (error) {
    console.log("error occured while config cloudinary");
    console.log(error);
  }
}
module.exports = cloudinaryConfig;