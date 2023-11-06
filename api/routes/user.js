const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

router.post("/signup", (req, res, next) => {
  User.find({ user : req.body.username })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "User exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: mongoose.Types.ObjectId(),
              username: req.body.username,
              password: hash,
              name: req.body.name,
              phone_number: req.body.number,
              gender: req.body.name,
              address: req.body.address,
              Dob: req.body.Dob,
              email: req.body.email
            });
            user
              .save()
              .then((result) => {
                if (err) {
                  return res.status(500).json({ msg: err.message });
                }
                res.status(201).json({
                  message: "User created",
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
});


router.post("/login", (req, res, next) => {
  User.find({ username: req.body.username }) 
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              username: user[0].username, 
              userId: user[0]._id,
              roles: user[0].roles,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h",
            }
          );
          res.cookie("token", token, { maxAge: 3600 });
          return res.status(200).json({
            message: "Auth successful"
          });
        }
        return res.status(401).json({
          message: "Invalid Username/Password",
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/logout",(req,res,next) => {
    res.clearCookie("token")
    .then(
      res.status(200).json({
        message: "Logged out"
      })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    }
    )
});
  

module.exports = router;
