const router = require("express").Router();
const User = require("../models/User");

const jwt = require("jsonwebtoken");
const { comparePasswords } = require("../helper/comparePasswords");
const { hashedPassword } = require("../helper/hashedPassword");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const hashedPass = await hashedPassword(req.body.password);
    const username = await User.find({ username: req.body.username });
    const email = await User.find({ email: req.body.email });

    if (username.length !== 0) {
      res.status(403).json("Username already exist...");
      return;
    } else if (email.length !== 0) {
      res.status(401).json("Email already exist...");
      return;
    }

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

    if (!user) {
      res.status(400).json("Wrong credentials!");
      return;
    }
    const validated = await comparePasswords(req.body.password, user.password);

    if (!validated) {
      res.status(400).json("Wrong credentials!");
      return;
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
