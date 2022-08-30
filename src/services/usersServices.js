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

const getByEmail = async (email, password) => {
  const result = await User.findOne({ where: { email, password } });
  if (!result) return null;
  return result;
};

const verifyEmail = async (email) => {
  const users = await User.findAll();
  const emails = await users.map((user) => user.dataValues.email);
  if (emails.includes(email)) throw new CustomError(409, 'User already registered');
};

const generateToken = async (user) => {
  const { email } = user;
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ email }, JWT_SECRET, jwtConfig);
  return token;
};

const create = async (user) => {
  const { displayName, email, password, image } = user;
  await User.create({ displayName, email, password, image });
  const token = generateToken(user);
  return token;
};

const findAll = async () => {
  const users = User.findAll({
    attributes: { exclude: ['password'] },
  });

  return users;
};

const findById = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });
  if (!user) return null;
  return user;
};

const deleteMe = async (userId) => {
  await User.destroy({ where: { id: userId } });
};

module.exports = {
  getByEmail,
  verifyEmail,
  create,
  findAll,
  findById,
  deleteMe,
};
