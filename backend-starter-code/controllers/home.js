const express = require('express');
const models = require('../models');

const HomeController = {
  registerRouter() {
    const router = express.Router();

    router.get('/', this.index);

    return router;
  },
  index(req, res) {
    //res.render('/homepage');
    // homepage for future reference. 
  }
};

module.exports = HomeController.registerRouter();
