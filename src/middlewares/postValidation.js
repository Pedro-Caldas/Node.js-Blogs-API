const joi = require('joi');

const FIELDS_MISSING = '400|Some required fields are missing';

const postSchema = joi.object().keys({
  title: joi.string().min(1).required().messages({
    'string.empty': FIELDS_MISSING,
  }),
  content: joi.string().min(1).required().messages({
    'string.empty': FIELDS_MISSING,
  }),
  categoryIds: joi.array().min(1).required().messages({
    'array.min': FIELDS_MISSING,
  }),
});

const isPostValid = (post) => {
  const isValid = postSchema.validate(post);
  return isValid;
};

const postMiddleware = (req, res, next) => {
  const post = req.body;
  const { error } = isPostValid(post);

  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(Number(code)).json({ message });
  }

  next();
};

const updatePostSchema = joi.object().keys({
  title: joi.string().min(1).required().messages({
    'string.empty': FIELDS_MISSING,
  }),
  content: joi.string().min(1).required().messages({
    'string.empty': FIELDS_MISSING,
  }),
});

const isUpdatedPostValid = (post) => {
  const isValid = updatePostSchema.validate(post);
  return isValid;
};

const updatePostMiddleware = (req, res, next) => {
  const post = req.body;
  const { error } = isUpdatedPostValid(post);

  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(Number(code)).json({ message });
  }

  next();
};

module.exports = {
  postMiddleware,
  updatePostMiddleware,
};