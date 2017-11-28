module.exports = (sequelize, DataTypes) => {
   Posts = sequelize.define('Posts', {

    title: { 
      type: DataTypes.STRING,
      unique: 'compositeIndex',
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    body: {
      type: DataTypes.STRING,
      validate: {
        allowNull: false,
        notEmpty: true,
      },
    },

    author: DataTypes.STRING,
    money: DataTypes.INTEGER,
  }, /*{
    classMethods: {
      associate: function(models) {
        // associations can be defined here[user require]
      }
    }
  }*/);

  Posts.associate = (models) => {
    Posts.hasMany(models.Ratings);
  } 
  return Posts;
};
