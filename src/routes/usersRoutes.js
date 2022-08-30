const express = require('express');

const userController = require('../controllers/usersController');
const userValidation = require('../middlewares/userValidation');
const tokenValidation = require('../middlewares/tokenValidation');

const route = express.Router();

route.post('/', userValidation.userMiddleware, userController.create);
route.get('/', tokenValidation.tokenMiddleware, userController.findAll);
route.get('/:id', tokenValidation.tokenMiddleware, userController.findById);
route.delete('/me', tokenValidation.tokenMiddleware, userController.deleteMe);

module.exports = route;