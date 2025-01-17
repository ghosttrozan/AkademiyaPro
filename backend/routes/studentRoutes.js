const express = require('express')
const route = express.Router()
const { verifyPrincipal } = require('../middlewares/auth')
const { registerStudent, updateStudent, deleteStudent, getAllStudents, getAllStudentByClass } = require('../controllers/principalController')

route.post('/register' , verifyPrincipal , registerStudent)

route.put('/update/:id' , verifyPrincipal , updateStudent)

route.delete('/remove/:id' , verifyPrincipal , deleteStudent)

route.get('/all' , verifyPrincipal , getAllStudents)

route.get('/class/:id' , verifyPrincipal , getAllStudentByClass)

module.exports = route