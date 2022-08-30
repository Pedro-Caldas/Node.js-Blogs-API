const usersService = require('../services/usersServices');
const CustomError = require('../errors/CustomError');

const create = async (req, res) => {
  const user = req.body;
  await usersService.verifyEmail(req.body.email);
  const token = await usersService.create(user);
  res.status(201).json({ token });
};

const findAll = async (_req, res) => {
  const users = await usersService.findAll();
  res.status(200).json(users);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const user = await usersService.findById(id);
  if (user === null) throw new CustomError(404, 'User does not exist');
  res.status(200).json(user);
};

const deleteMe = async (req, res) => {
  const userId = req.user.id;
  await usersService.deleteMe(userId);
  console.log(userId);
  res.status(204).end();
};

module.exports = {
  create,
  findAll,
  findById,
  deleteMe,
};