const express = require('express')
const { registerClass, getClass, getAllClasses, updateClass, deleteClass } = require('../controllers/classController')
const { verifyPrincipal } = require('../middlewares/auth')
const route = express.Router()

route.post('/register' , verifyPrincipal , registerClass)

route.get('/detail/:id' , verifyPrincipal , getClass)

route.get('/all' , verifyPrincipal , getAllClasses)

route.put('/update/:id' , verifyPrincipal , updateClass)

route.delete('/remove/:id' , verifyPrincipal , deleteClass)

module.exports = route