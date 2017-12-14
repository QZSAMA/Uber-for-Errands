const express = require('express');
const models = require('../models');

const AboutusController = {
  registerRouter() {
    const router = express.Router();

    router.get('/', this.index);

    return router;
  },
  index(req, res) {
    res.render('aboutus');
    
  }
};

module.exports = AboutusController.registerRouter();
