const express = require('express');

const postsController = require('../controllers/postsController');
const postValidation = require('../middlewares/postValidation');
const tokenValidation = require('../middlewares/tokenValidation');

const route = express.Router();

route.post('/',
  tokenValidation.tokenMiddleware,
  postValidation.postMiddleware,
  postsController.create);

module.exports = route;