const express = require('express');
const route = express.Router();
const {verifyPrincipal} = require('../middlewares/auth');
const {registerSchool , getSchoolById, updateSchool} = require('../controllers/schoolController');
const upload = require('../utils/multer');

const uploadMiddleware = upload.single('image');

route.post('/register' , uploadMiddleware , verifyPrincipal , registerSchool)

route.get('/detail' , verifyPrincipal , getSchoolById)

route.put('/update/:id' , uploadMiddleware , verifyPrincipal , updateSchool)

module.exports = route