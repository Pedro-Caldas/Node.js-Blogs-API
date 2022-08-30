const express = require('express');

const postsController = require('../controllers/postsController');
const postValidation = require('../middlewares/postValidation');
const tokenValidation = require('../middlewares/tokenValidation');

const route = express.Router();

route.post('/',
  tokenValidation.tokenMiddleware,
  postValidation.postMiddleware,
  postsController.create);
route.get('/search', tokenValidation.tokenMiddleware, postsController.search);
route.get('/', tokenValidation.tokenMiddleware, postsController.findAll);
route.get('/:id', tokenValidation.tokenMiddleware, postsController.findById);
route.put('/:id',
  tokenValidation.tokenMiddleware,
  postValidation.updatePostMiddleware,
  postsController.update);
route.delete('/:id', tokenValidation.tokenMiddleware, postsController.destroy);

module.exports = route;