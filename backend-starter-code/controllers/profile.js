const express = require('express');
const Redirect = require('../middlewares/redirect');

const ProfileController = {
  registerRouter() {
    const router = express.Router();

    router.get('/', Redirect.ifNotLoggedIn(), this.index);

    return router;
  },
  index(req, res) {
    res.render('profile', { user: req.user, success: req.flash('success') });
  },
};

module.exports = ProfileController.registerRouter();