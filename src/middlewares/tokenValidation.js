require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../database/models');
const CustomError = require('../errors/CustomError');

const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  const error = new Error();
  error.message = 'JWT_SECRET wasn\'t defined at .env';
  throw error;
}

const tokenMiddleware = async (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) throw new CustomError(401, 'Token not found');

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ where: { email: decoded.email } });
    req.user = user;
  
    next();
  } catch (err) {
    throw new CustomError(401, 'Expired or invalid token');
  }
};

module.exports = {
  tokenMiddleware,
};