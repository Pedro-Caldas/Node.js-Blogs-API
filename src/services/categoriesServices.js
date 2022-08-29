const { Category } = require('../database/models');
const CustomError = require('../errors/CustomError');

const create = async (name) => {
  if (!name || name.length === 0) throw new CustomError(400, '"name" is required');
  const category = await Category.create({ name });
  return category;
};

const findAll = async () => {
  const categories = await Category.findAll();
  return categories;
};

const verifyCategories = async (categoriesIds) => {
  const categories = await Category.findAll();
  const existingIds = categories.map((category) => category.id);
  let validCategories = 0;
  categoriesIds.forEach((el) => {
    if (existingIds.includes(el)) validCategories += 1;
  });
  if (validCategories === 0) throw new CustomError(400, '"categoryIds" not found');
};

module.exports = {
  create,
  findAll,
  verifyCategories,
};