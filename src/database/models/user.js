module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.INTEGER,
    image: DataTypes.INTEGER,
  }, {
    timestamps: false,
    tableName: 'Users'
  });

  return User;
};