const bcrypt = require('bcrypt-nodejs');


module.exports = (sequelize, DataTypes) => {
  Users = sequelize.define('Users', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
      notEmpty: true,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
      notEmpty: true,
      },
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
      notEmpty: true,
      isAlphanumeric: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
      notEmpty: true,
      isEmail: true,
      },
    },
    password_hash: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.VIRTUAL,
      validate: {
      notEmpty: true,
      },
    }}, {
      classMethods: {
        associate: function(models) {
        // associations can be defined here[user require]
        }
      }
    });


  Users.beforeCreate((user) =>
    new sequelize.Promise((resolve) => {
      bcrypt.hash(user.password, null, null, (err, hashedPassword) => {
        resolve(hashedPassword);
      });
    }).then((hashedPw) => {
        user.password_hash = hashedPw;
    })
  );

    return Users;
};