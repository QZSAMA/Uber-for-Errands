const express = require('express');
const models = require('../models');

const PostsController = {
  registerRouter() {
    const router = express.Router();

    router.get('/', this.index);//
    router.post('/', this.create);//post a post
    router.get('/:id',this.show);//specific post

    return router;
  },
  show(req,res){
    models.Posts.findOne({
      where:{
        id:req.params.id,
      }
    }).then((post)=>{
       (post ? res.render('posts/single', { post, body: post.body }) : res.redirect('/posts'))
    
    })
  },
  index(req, res) {
    models.Posts.findAll()
      .then((posts) => {
        res.render('posts', { posts });
      });
  },
  create(req, res) {
    models.Posts.create({
      title:req.body.title,
      post: req.body.post,
      author: req.body.author,
      money:req.body.money
    })
    .then((post) => {
      res.redirect('/posts');
    })
    .catch((err) => {
      console.log('ERROR while creating a new post');
      res.redirect('/error');
    })
  }
};

module.exports = PostsController.registerRouter();
