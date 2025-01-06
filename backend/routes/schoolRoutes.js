const express = require('express');
const route = express.Router();
const {verifyPrincipal} = require('../middlewares/auth');
const {registerSchool , getSchoolById} = require('../controllers/schoolController');

route.post('/register' , verifyPrincipal , registerSchool)

route.get('/detail' , verifyPrincipal , getSchoolById)

module.exports = route