const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const { verifyToken } = require("../helper/verifyToken");

// CREATE POST
router.post("/:userId", verifyToken, async (req, res) => {
  if (req.user.id === req.params.userId) {
    try {
      const newPost = new Post(req.body);
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You don't have permission to post");
  }
});

// UPDATE POST

router.put("/:id/:userId", verifyToken, async (req, res) => {
  if (req.user.id === req.params.userId) {
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true } // to send new user that updated
      );
      res.status(200).json(updatedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can update only your post!");
  }
});

module.exports = router;
