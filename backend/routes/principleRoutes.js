const express = require('express');
const {
  registerPrincipal,
  getPrincipalById,
  loginPrincipal,
  registerNewTeacher,
  deleteTeacher,
  getTeachers,
  getTeachersById,
  updatePrincipal,
  updateTeacher,
} = require('../controllers/principalController');
const { verifyPrincipal } = require('../middlewares/auth');
const { principalRegisterSchema } = require('../validations/principalValidation'); // Joi schema
const { validate } = require('../middlewares/validate'); // Import the validate function
const upload = require('../utils/multer');
const route = express.Router();

const uploadMiddleware = upload.single('image');

route.post('/register', uploadMiddleware , validate(principalRegisterSchema), registerPrincipal); // Use validate middleware here

route.get('/verify', verifyPrincipal, getPrincipalById);

route.put('/update', verifyPrincipal, updatePrincipal);

route.post('/login', loginPrincipal);

route.post('/register/new/teacher', verifyPrincipal, registerNewTeacher);

route.delete('/remove/teacher/:id', verifyPrincipal, deleteTeacher);

route.get('/all/teachers', verifyPrincipal, getTeachers);

route.get('/teacher/:id', verifyPrincipal, getTeachersById);

route.put('/teacher/update/:id', verifyPrincipal, updateTeacher);

module.exports = route;
