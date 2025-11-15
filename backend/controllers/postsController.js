const Post = require('../models/Post');

// Create Post
exports.createPost = async (req, res) => {
  const { title, content } = req.body;

  try {
    const post = new Post({
      title,
      content,
      author: req.user.id  // REQUIRED FOR DELETE
    });

    await post.save();
    res.status(201).json(post);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get All Posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username email')
      .sort({ createdAt: -1 });

    res.json(posts);

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get Single Post
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username email');

    if (!post)
      return res.status(404).json({ message: 'Post not found' });

    res.json(post);

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update Post
exports.updatePost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post)
      return res.status(404).json({ message: 'Post not found' });

    if (post.author.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not authorized' });

    post.title = req.body.title ?? post.title;
    post.content = req.body.content ?? post.content;

    await post.save();
    res.json(post);

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete Post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post)
      return res.status(404).json({ message: 'Post not found' });

    if (post.author.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not authorized' });

    // 🔥 FIXED DELETE (remove() is deprecated)
    await Post.findByIdAndDelete(req.params.id);

    res.json({ message: 'Post removed' });

  } catch (err) {
    console.log("DELETE ERROR:", err);
    res.status(500).json({ message: 'Server error' });
  }
};
