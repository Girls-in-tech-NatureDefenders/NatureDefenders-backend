const express = require("express");
const userController = require('../controllers/userController');
//const { requireAuth } = require("../middleware/auth");
const route = express.Router()

// route.get('/register', userController.register_get)
route.post('/register',  userController.register_post)
route.get('/login',userController.login_get)
route.post('/login',userController.login_post)
route.get('/logout',userController.logout_get)

module.exports = route