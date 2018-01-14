const models = require('../models');

module.exports = (sequelize, DataTypes) => {
   const Posts = sequelize.define('Posts', {
    
    title: { 
      type: DataTypes.STRING,
      unique: 'compositeIndex',
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    post: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
      notEmpty: true,
      },
    },

    money:{
      type:DataTypes.DOUBLE,
      allowNull:false,
      validate:{
        notEmpty:true,
      }

    },
    location:{
      type:DataTypes.STRING,
      allowNull:true,
      
    },
  })

  Posts.associate=(models)=> {
    Posts.belongsTo(models.Users);
  }
    
  
  return Posts;
};
