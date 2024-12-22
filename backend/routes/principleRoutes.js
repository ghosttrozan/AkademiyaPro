const express = require('express');
const { registerPrincipal, getPrincipalById, loginPrincipal } = require('../controllers/principalController');
const route = express.Router();

route.post('/principal/register' , registerPrincipal)

route.get('/principal/:id' , getPrincipalById)

route.post('/principal/login' , loginPrincipal)

module.exports = route;