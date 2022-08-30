const postsServices = require('../services/postsServices');
const categoriesServices = require('../services/categoriesServices');

const create = async (req, res) => {
  const userId = req.user.id;
  const { title, content, categoryIds } = req.body;
  await categoriesServices.verifyCategories(categoryIds);
  const post = await postsServices.create({ title, content, categoryIds, userId });
  res.status(201).json(post);
};

const findAll = async (_req, res) => {
  const posts = await postsServices.findAll();
  res.status(200).json(posts);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const post = await postsServices.findById(id);
  res.status(200).json(post);
};

module.exports = {
  create,
  findAll,
  findById,
};