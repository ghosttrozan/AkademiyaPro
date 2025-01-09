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
    default: 'principal', // This ensures role consistency
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Principal" , principleSchema)
