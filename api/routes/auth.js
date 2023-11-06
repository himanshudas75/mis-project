const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");


router.get("/verify", function (req, res, next) {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "Token Not Found",
      });
    }

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        res.clearCookie("token");
        return res.status(401).json({
          message: err,
        });
      }

      return res.status(200).json({
        message: "Auth successful",
      });
    });
  });
  
module.exports = router;