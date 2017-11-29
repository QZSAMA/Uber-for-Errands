const passport = require('../middlewares/authentication');
const router = require('express').Router();
const models=require('../models');
const express = require('express');
const Redirect = require('../middlewares/redirect');

const LoginController={
	registerRouter(){
		
		router.get('/', this.index);//render Login page
		router.post('/',this.login);//LOGIN
		return router;
	},
	index(req,res){
		res.render('login',{ error: req.flash('error') });
	},
	login(req,res){
		passport.authenticate('local', {
      	successRedirect: '/posts',
      	failureRedirect: '/login',
      	failureFlash: true,
      	successFlash: true,
    })(req, res);
  },
}

module.exports = LoginController.registerRouter();
