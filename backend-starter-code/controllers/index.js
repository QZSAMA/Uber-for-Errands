const express = require('express');
const router = express.Router();


router.use('/login', require('./login'));
router.use('/logout', require('./logout'));
router.use('/posts', require('./posts'));
router.use('/sign-up', require('./sign-up'));

module.exports = router;