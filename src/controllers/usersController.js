const usersService = require('../services/usersServices');

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

module.exports = {
  create,
  findAll,
};