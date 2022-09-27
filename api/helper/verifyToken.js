const jwt = require("jsonwebtoken");

module.exports = {
  verifyToken(req, res, next) {
    const authHeader = req.headers.token;
    if (authHeader) {
      const token = authHeader.split(" ")[1]; // cuz we use Bearer before the token when send the token in the header
      jwt.verify(token, process.env.JWT_SEC, (err, user) => {
        if (err) {
          res.status(403).json("Token is not valid!");
          return;
        }
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json("You are not authenticated!");
    }
  },
};
