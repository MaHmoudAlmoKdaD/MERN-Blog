const router = require("express").Router();
const Middleware = require("../helper/uploadImages");

router.post("/", Middleware.upload("file"), (req, res) => {
  res.status(200).json("file has been uploaded!");
});

module.exports = router