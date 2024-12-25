const express = require('express')
const { registerClass, getClass } = require('../controllers/classController')
const { verifyPrincipal, verifyUser } = require('../middlewares/auth')
const route = express.Router()

route.post('/register' , verifyPrincipal , registerClass)

route.get('/detail/:id' , verifyUser , getClass)

module.exports = route