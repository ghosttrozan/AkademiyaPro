const express = require('express');
const { loginTeacher, getTeachersById } = require('../controllers/teacherController');
const { verifyTeacher } = require('../middlewares/auth');
const route = express.Router();

route.post('/login' , loginTeacher)

route.get('/profile', verifyTeacher, getTeachersById)


module.exports = route;