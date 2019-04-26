const express = require('express');
const getRoot = require('./get/get.ts');
const postRoot = require('./post/post.ts');
const putRoot = require('./put/put.ts');

const router = express.Router();

router.get('/articles', getRoot.getHandler);
router.get('/articles/:id', getRoot.getHandlerID);
router.put('/articles/:id', putRoot);
router.post('/articles', postRoot);

module.exports = router;
