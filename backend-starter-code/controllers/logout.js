const passport = require('../middlewares/authentication');
const router = require('express').Router();
const models=require('../models');
const express = require('express');
const Redirect = require('../middlewares/redirect');

const LogoutController = {
  registerRouter() {
    const router = express.Router();

    router.post('/', this.logout);

    return router;
  },
  logout(req, res) {
    req.logout();
    res.redirect('/');
  },
};

module.exports = LogoutController.registerRouter();