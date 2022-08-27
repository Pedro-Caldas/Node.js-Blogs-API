const joi = require('joi');

const userSchema = joi.object().keys({
  displayName: joi.string().min(8).required().messages({
    'string.min': '400|"displayName" length must be at least {#limit} characters long',
  }),
  email: joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.email': '400|"email" must be a valid email',
  }),
  password: joi.string().min(6).required().messages({
    'string.min': '400|"password" length must be at least {#limit} characters long',
  }),
  image: joi.string(),
});

const isUserValid = (user) => {
  const isValid = userSchema.validate(user);
  return isValid;
};

const userMiddleware = (req, res, next) => {
  const user = req.body;
  const { error } = isUserValid(user);

  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(Number(code)).json({ message });
  }

  next();
};

module.exports = {
  userMiddleware,
};