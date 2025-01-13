const express = require('express')
const { registerClass, getClass, getAllClasses } = require('../controllers/classController')
const { verifyPrincipal, verifyUser } = require('../middlewares/auth')
const route = express.Router()

route.post('/register' , verifyPrincipal , registerClass)

route.get('/detail/:id' , verifyPrincipal , getClass)

route.get('/all' , verifyPrincipal , getAllClasses)

module.exports = route