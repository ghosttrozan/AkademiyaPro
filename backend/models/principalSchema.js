const mongoose = require('mongoose')

const principleSchema = mongoose.Schema({
  name : {
    type : String,
    required : true
  } ,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select:false,
  },
  image: {  
    type: String,
    default: null, 
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true
  },
  contactNumber: {
    type: String,
    required: true,
    unique: true,
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
  },
  role: {
    type: String,
    default: 'Principal', // This ensures role consistency
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Principal" , principleSchema)
