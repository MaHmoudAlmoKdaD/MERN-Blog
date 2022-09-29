const router = require("express").Router();
const Category = require("./../models/Category");
const { verifyToken } = require("../helper/verifyToken");

// CREATE CATEGORY
router.post("/:userId", verifyToken, async (req, res) => {
  if (req.user.id === req.params.userId) {
    const newCat = new Category(req.body);
    try {
      await newCat.save();
      res.status(200).json(newCat);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You are not authenticated!");
  }
});

// UPDATE
router.put("/:id/:userId", verifyToken, async (req, res) => {
  if (req.user.id === req.params.userId) {
    try {
      const category = await Category.findById(req.params.id);
      if (category.length !== 0) {
        const updatedCat = await Category.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedCat);
      } else {
        res.status(401).json("Post does not exist...");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You are not authenticated!");
  }
});

module.exports = router;
