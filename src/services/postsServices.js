const { BlogPost, PostCategory, User, Category, sequelize } = require('../database/models');
const CustomError = require('../errors/CustomError');

const create = async ({ title, content, categoryIds, userId }) => {
  const transactionResult = await sequelize.transaction(async (transaction) => {
    const post = await BlogPost.create({ title, content, categoryIds, userId }, { transaction });

    const postId = post.id;
    const postCategories = categoryIds.map((category) => ({ postId, categoryId: category }));
    await PostCategory.bulkCreate(postCategories, { transaction });

    return post;
  });

  return transactionResult;
};

const findAll = async () => {
  const posts = await BlogPost.findAll({
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    {
      model: Category,
      as: 'categories',
    }],
  });

return posts;
};

const findById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    {
      model: Category,
      as: 'categories',
    }],
  });
  if (!post || post.length === 0) throw new CustomError(404, 'Post does not exist');
  return post;
};

const update = async ({ userId, id, title, content }) => {
  const post = await BlogPost.findByPk(id);
  if (!post || post.length === 0) throw new CustomError(404, 'Post does not exist');
  if (userId !== post.dataValues.userId) throw new CustomError(401, 'Unauthorized user');
  await BlogPost.update({ title, content }, { where: { id } });
  const updatedPost = await BlogPost.findByPk(id, {
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    {
      model: Category,
      as: 'categories',
    }],
  });

  return updatedPost;
};

const destroy = async ({ userId, id }) => {
  const post = await BlogPost.findByPk(id);
  if (!post || post.length === 0) throw new CustomError(404, 'Post does not exist');
  if (userId !== post.dataValues.userId) throw new CustomError(401, 'Unauthorized user');
  await BlogPost.destroy({ where: { id } });
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  destroy,
};