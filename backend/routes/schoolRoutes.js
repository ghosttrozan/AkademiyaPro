const express = require('express');
const route = express.Router();
const {verifyPrincipal} = require('../middlewares/auth');
const {registerSchool , getSchoolById, updateSchool} = require('../controllers/schoolController');

route.post('/register' , verifyPrincipal , registerSchool)

route.get('/detail' , verifyPrincipal , getSchoolById)

route.put('/update/:id' , verifyPrincipal , updateSchool)

module.exports = route