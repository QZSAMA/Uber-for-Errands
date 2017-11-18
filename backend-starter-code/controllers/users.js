const express = require('express');
const models = require('../models');

const UsersController={
  registerRouter() {
    const router = express.Router();

    router.get('/', this.index);
    router.get('/:username', this.show);

    return router;
  },
  index(req, res) {
    models.Users.findAll({
    }).then((allUsers) => {
      res.render('users', { allUsers });
    });
  },
  show(req, res) {
    models.Users.findOne({
      where: {
        userName: req.params.username,
      },
      include: [{
        model: models.Posts,
      }],
    }).then((user) => {
      if(user) {
        res.render('users/single', { user: user, allPosts: user.posts });
      } else {
        res.redirect('/users');
      }
    }).catch(() => {
      res.redirect('/users');
    });
  },
};
module.exports=UsersController.registerRouter();
