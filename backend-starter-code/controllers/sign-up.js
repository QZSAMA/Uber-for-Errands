const express = require('express');
const models = require('../models');

const signupController = {
	registerRouter() {
		const router = express.Router();

		router.get('/', this.index);
	    router.post('/', this.create);

	  return router;
	},
	index(req, res) {
		res.render('sign-up');
	},
	create(req,res){
		models.Users.create({
			firstName: req.body.firstName,
      		lastName: req.body.lastName,
      		email: req.body.email,
			password: req.body.password,
		}).then((user) => {
			req.login(user, () =>
				res.redirect('/posts')
			);
		}).catch(() => {
			res.render('sign-up')
		});
	},
};

module.exports = signupController.registerRouter();