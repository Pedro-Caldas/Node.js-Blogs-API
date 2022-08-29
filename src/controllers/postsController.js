const postsServices = require('../services/postsServices');
const categoriesServices = require('../services/categoriesServices');

const create = async (req, res) => {
  const userId = req.user.id;
  const { title, content, categoryIds } = req.body;
  await categoriesServices.verifyCategories(categoryIds);
  const post = await postsServices.create({ title, content, categoryIds, userId });
  res.status(201).json(post);
};

module.exports = {
  create,
};