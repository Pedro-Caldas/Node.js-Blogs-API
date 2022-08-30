const postsServices = require('../services/postsServices');
const categoriesServices = require('../services/categoriesServices');

const search = async (req, res) => {
  const { q } = req.query;
  const postsArr = await postsServices.search(q);
  res.status(200).json(postsArr);
};

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

const update = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const userId = req.user.id;
  const post = await postsServices.update({ userId, id, title, content });
  res.status(200).json(post);
};

const destroy = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  await postsServices.destroy({ userId, id });
  res.status(204).end();
};

module.exports = {
  search,
  create,
  findAll,
  findById,
  update,
  destroy,
};