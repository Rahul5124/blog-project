
// routes/comments.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const CommentsCtrl = require('../controllers/commentsController');

router.get('/', CommentsCtrl.getComments);
router.post('/', auth, CommentsCtrl.createComment);

module.exports = router;