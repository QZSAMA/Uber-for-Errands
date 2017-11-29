const express = require('express');
const router = express.Router();

router.use('/',require('./home'));

router.use('/login', require('./login'));
router.use('/logout', require('./logout'));
router.use('/posts', require('./posts'));
router.use('/sign-up', require('./sign-up'));
router.use('/users',require('./users'));
router.use('/profile',require('./profile'));


module.exports = router;