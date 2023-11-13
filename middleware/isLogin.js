const jwt = require("jsonwebtoken");

const isLogin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!authHeader.startsWith("Bearer") || !token) {
    res.status(401).send({ msg: "Authentication Invalid" });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        return res.status(403).send({ msg: "Authentication Invalid" });
      } else {
        req.user = { userId: payload.userId };
        next();
      }
    });
  }
};

module.exports = isLogin;