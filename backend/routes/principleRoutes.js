const express = require('express');
const { registerPrincipal, getPrincipalById, loginPrincipal, registerNewTeacher, deleteTeacher, getTeachers, getTeachersById, updatePrincipal } = require('../controllers/principalController');
const {verifyPrincipal} = require('../middlewares/auth');
const route = express.Router();

route.post('/register' , registerPrincipal)

route.get('/verify' , verifyPrincipal , getPrincipalById)

route.put('/update' , verifyPrincipal , updatePrincipal)

route.post('/login' , loginPrincipal)

route.post('/register/new/teacher' , verifyPrincipal , registerNewTeacher)

route.delete('/remove/teacher/:id' , verifyPrincipal , deleteTeacher)

route.get('/all/teachers' , verifyPrincipal , getTeachers)

route.get('/teacher/:id' , verifyPrincipal , getTeachersById)

module.exports = route;