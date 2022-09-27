const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

async function hashedPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);
  return hashedPass;
}

//UPDATE

router.put("/:id", async (req, res) => {
  if (req.body.id === req.params.id) {
    try {
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("you can update your account");
  }
});

// DELETE
module.exports = router;
