const express = require('express');
const route = express.Router();
const verifyPrincipal = require('../middlewares/auth');
const registerSchool = require('../controllers/schoolController');

route.post('/register' , verifyPrincipal , registerSchool)

module.exports = route