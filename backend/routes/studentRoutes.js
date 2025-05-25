const express = require('express')
const route = express.Router()
const { verifyPrincipal, verifyStaff } = require('../middlewares/auth')
const { registerStudent, updateStudent, deleteStudent, getAllStudents, getAllStudentByClass, getStudentById } = require('../controllers/principalController')
const upload = require('../utils/multer');
const uploadMiddleware = upload.single('image');

route.post('/register', verifyPrincipal, uploadMiddleware, registerStudent)

route.get('/:id', verifyStaff, getStudentById )

route.put('/update/:id', verifyPrincipal, uploadMiddleware, updateStudent)

route.delete('/remove/:id', verifyPrincipal, deleteStudent)

route.get('/all/student', verifyPrincipal, getAllStudents)

route.get('/class/:id', verifyPrincipal, getAllStudentByClass)

module.exports = route