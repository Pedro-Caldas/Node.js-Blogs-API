const categoriesServices = require('../services/categoriesServices');

const create = async (req, res) => {
  const { name } = req.body;
  const category = await categoriesServices.create(name);
  res.status(201).json(category);
};

const findAll = async (req, res) => {
  const categories = await categoriesServices.findAll();
  res.status(200).json(categories);
};

module.exports = {
  create,
  findAll,
};