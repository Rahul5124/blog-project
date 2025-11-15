const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const PostsCtrl = require('../controllers/postsController');

router.get('/', PostsCtrl.getPosts);
router.get('/:id', PostsCtrl.getPostById);
router.post('/', auth, PostsCtrl.createPost);
router.put('/:id', auth, PostsCtrl.updatePost);
router.delete('/:id', auth, PostsCtrl.deletePost);

module.exports = router;
