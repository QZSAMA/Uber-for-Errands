module.exports = (sequelize, DataTypes) => {
   Posts = sequelize.define('Posts', {
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
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here[user require]
      }
    }
  });
  return Posts;
};
