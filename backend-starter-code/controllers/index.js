const express = require('express');
const router = express.Router();


router.use('/login', require('./login'));

//router.use('/profile', require('./profile'));


//router.use('/', require('./home'));
router.use('/posts', require('./posts'));
//router.use('/alt',require('./alt'));

module.exports = router;