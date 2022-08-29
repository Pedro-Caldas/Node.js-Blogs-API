const joi = require('joi');

const postSchema = joi.object().keys({
  title: joi.string().min(1).required().messages({
    'string.empty': '400|Some required fields are missing',
  }),
  content: joi.string().min(1).required().messages({
    'string.empty': '400|Some required fields are missing',
  }),
  categoryIds: joi.array().min(1).required().messages({
    'array.min': '400|Some required fields are missing',
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

module.exports = {
  postMiddleware,
};