const categoriesServices = require('../services/categoriesServices');

const create = async (req, res) => {
  const { name } = req.body;
  const category = await categoriesServices.create(name);
  console.log(category);
  res.status(201).json(category);
};

module.exports = {
  create,
};