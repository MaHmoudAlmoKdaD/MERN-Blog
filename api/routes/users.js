const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const { verifyToken } = require("../helper/verifyToken");
const { hashedPassword } = require("../helper/hashedPassword");

//UPDATE

router.put("/:id", verifyToken, async (req, res) => {
  if (req.user.id === req.params.id) {
    if (req.body.password) {
      req.body.password = await hashedPassword(req.body.password);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true } // to send new user that updated
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You are not allowed to do that!");
  }
});

// DELETE
router.delete("/:id", verifyToken, async (req, res) => {
  if (req.user.id === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        res.status(404).json("User not found!");
        return;
      }
      await Post.deleteMany({ username: user.username });
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You are not allowed to do that!");
  }
});

//GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json("User not found!");
      return;
    }
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
