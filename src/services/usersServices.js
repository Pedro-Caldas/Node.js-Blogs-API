const { User } = require('../database/models');

const getByEmail = async (email, password) => {
  const result = await User.findOne({ where: { email, password } });
  if (!result) return null;
  return result;
};

module.exports = {
  getByEmail,
};
