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
    }
    
    avgRating {},


    phoneNumber {
      type: DataTypes.STRING,
      validate: {
        is: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, 
        notEmpty: true,
      }
    },

    // how can I use the google maps api to validate this address?
    address {
      line1: DataTypes.STRING,
      line2: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      zip: {
        type: DataTypes.STRING,
        validate: {
          is: ^[0-9]{5}(?:-[0-9]{4})?$
        }
      }
    },

  }/*, {
      classMethods: {
        associate: function(models) {
        // associations can be defined here[user require]
        }
      }
    }*/);

  Users.associate = (models) => {
  Users.belongsToMany(Skills, {through: 'UsersSkills'}); } //many to many relationship with skills table through UsersSkills

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