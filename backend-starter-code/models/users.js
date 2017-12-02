const bcrypt = require('bcrypt-nodejs');
const models = require('../models')

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
    },
    
    //avgRating {}, maybe make this a class method that is computed every time it is asked for instead of a column in the user table?

    phoneNumber: {
      type: DataTypes.STRING,
      validate: {
        is: ["^1?[-. ]?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/", 'i'],
        notEmpty: true,
      },
    },

    // how can I use the google maps api to validate this address?
    addressLine1: DataTypes.STRING,
    addressLine2: DataTypes.STRING,
    addressCity: DataTypes.STRING,
    addressState: DataTypes.STRING,

    });

  Users.associate = (models) => {
    Users.hasMany(models.Posts);
    // Users.belongsToMany(models.Skills, {through: 'UsersSkills'}); //many to many relationship with skills table through UsersSkills
    // Users.hasMany(models.Posts, {as: 'client'});
    // Users.hasMany(models.Posts, {as: 'worker'});
    // Users.hasMany(models.Ratings, {as: 'author'});
    // Users.hasMany(models.Ratings, {as: 'subject'});
  };


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