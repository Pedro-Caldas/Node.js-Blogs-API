const express = require('express');

const categoriesController = require('../controllers/categoriesControllers');
const tokenValidation = require('../middlewares/tokenValidation');

const route = express.Router();

route.post('/', tokenValidation.tokenMiddleware, categoriesController.create);
route.get('/', tokenValidation.tokenMiddleware, categoriesController.findAll);

module.exports = route;