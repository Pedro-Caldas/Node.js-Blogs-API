const { BlogPost, PostCategory, sequelize } = require('../database/models');

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

module.exports = {
  create,
};