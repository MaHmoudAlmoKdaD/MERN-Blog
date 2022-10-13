const multer = require("multer");

function multerSetup() {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  return storage;
}

Middleware = {
  upload: function (file) {
    const upload = multer({ storage: multerSetup() });
    return upload.single(file);
  },
};

module.exports = Middleware;
