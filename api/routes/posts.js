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
      const post = await Post.findById(req.params.id);
      if (post.username === req.body.username) {
        try {
          const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedPost);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can update only your post!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can update only your post!");
  }
});

// DELETE POST
router.delete("/:id/:userId", verifyToken, async (req, res) => {
  if (req.user.id === req.params.userId) {
    try {
      const post = await Post.findById(req.params.id);
      if (post.username === req.body.username) {
        try {
          post.delete();
          res.status(200).json("Post has been deleted...");
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can update only your post!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can update only your post!");
  }
});

// GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json("Post not found!");
      return;
    }
    const { password, ...others } = post._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL POST
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try { 
    let posts;
    if (username) {
      posts = await Post.find({ username: username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
