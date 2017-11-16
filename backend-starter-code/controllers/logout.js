const passport = require('../middlewares/authentication');
const router = require('express').Router();
const models=require('../models');
const express = require('express');
const Redirect = require('../middlewares/redirect');

const LogoutController = {
  registerRouter() {
    const router = express.Router();

    router.get('/', this.logout);

    return router;
  },
  logout(req, res) {
    req.logout();
    res.redirect('/login');
  },
};

module.exports = LogoutController.registerRouter();