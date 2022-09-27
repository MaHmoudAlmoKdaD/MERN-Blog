const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

async function hashedPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);
  return hashedPass;
}

//REGISTER

router.post("/register", async (req, res) => {
  try {
    const hashedPass = await hashedPassword(req.body.password);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Wrong credentials");

    const validated = await bcrypt.compare(req.body.password, user.username);
    !validated && res.status(400).json("Wrong credentials");

    const { password, ...others } = user;
    res.status(200).json(others);
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router; 
