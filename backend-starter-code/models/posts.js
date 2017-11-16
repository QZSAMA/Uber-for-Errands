const models = require('../models');

module.exports = (sequelize, DataTypes) => {
   const Posts = sequelize.define('Posts', {
    title:{ type: DataTypes.STRING,
      unique: 'compositeIndex',
      allowNull: false,
      validate: {
      notEmpty: true,},
      },
    post: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
      notEmpty: true,
      },},
    author: DataTypes.STRING,
    money:DataTypes.INTEGER
  })
  Posts.associate=(models)=> {
        models.Posts.belongsTo(models.Users);
      }
    
  
  return Posts;
};
