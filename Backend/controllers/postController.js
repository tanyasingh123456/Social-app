const Post = require("../models/Post");
const Like = require("../models/Like");

// Create Post
exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || content.length > 280) {
      return res.status(400).json({ message: "Invalid post content" });
    }

    const post = await Post.create({
      content,
      user: req.userId // assume hardcoded user
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get All Posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 });

    const formattedPosts = await Promise.all(
      posts.map(async (post) => {
        const likeCount = await Like.countDocuments({ post: post._id });

        const isLiked = await Like.findOne({
          post: post._id,
          user: req.userId
        });

        return {
          ...post._doc,
          likeCount,
          isLiked: !!isLiked
        };
      })
    );

    res.json(formattedPosts);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};