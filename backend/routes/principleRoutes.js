const express = require('express');
const { registerPrincipal, getPrincipalById, loginPrincipal } = require('../controllers/principalController');
const route = express.Router();

route.post('/register' , registerPrincipal)

route.get('/:id' , getPrincipalById)

route.post('/login' , loginPrincipal)

module.exports = route;