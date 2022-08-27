const express = require('express');

const userController = require('../controllers/usersController');
const userValidation = require('../middlewares/userValidation');

const route = express.Router();

route.post('/', userValidation.userMiddleware, userController.create);

module.exports = route;