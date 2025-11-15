// controllers/commentsController.js
const Comment = require('../models/Comment');
const Post = require('../models/Post');

exports.createComment = async (req, res) => {
  const { postId, content } = req.body;
  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const comment = new Comment({ post: postId, content, author: req.user.id });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
};

exports.getComments = async (req, res) => {
  const { postId } = req.query;
  try {
    const query = postId ? { post: postId } : {};
    const comments = await Comment.find(query).populate('author', 'username').sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
};

