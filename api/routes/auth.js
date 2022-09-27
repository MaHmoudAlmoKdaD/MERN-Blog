const router = require("express").Router();
const User = require("../models/User");
const helperFunctions = require("./../helper/helperFunctions");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    // const hashedPass = await hashedPassword(req.body.password);
    const hashedPass = await helperFunctions.hashedPassword(req.body.password);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();
    const { password, ...userToClient } = user._doc;
    res.status(200).json(userToClient);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    // !user && res.status(400).json("Wrong credentials!");
    if (!user) {
      res.status(400).json("Wrong credentials!");
      return;
    }
    const validated = await bcrypt.compare(req.body.password, user.password);
    // !validated && res.status(400).json("Wrong credentials!");
    if (!validated) {
      res.status(400).json("Wrong credentials!");
      return;
    }
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
