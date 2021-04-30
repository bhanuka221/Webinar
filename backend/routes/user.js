const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const constants = require("../utils/Constant");
const router = express.Router();

router.post("/signUp", (req, res, next) => {
  console.log(req.body);
  const { name, email, mobileNumber, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    console.log("HASH : ", hash);
    const user = new User({
      name: name,
      email: email,
      password: hash,
      mobileNumber: mobileNumber,
      role: "ADMIN",
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "Sign-Up Successfully!",
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
          message: "Email already exists!",
        });
      });
  });
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  let authedUser;
  User.findOne({ email: email })
    .then((existsUser) => {
      if (!existsUser) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }
      authedUser = existsUser;
      return bcrypt.compare(password, existsUser.password);
    })
    .then((validPassword) => {
      if (!validPassword) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      const token = jwt.sign(
        {
          email: authedUser.email,
          userId: authedUser._id,
          role: authedUser.role,
        },
        constants.JWT_PRIVATE_KEY,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        user: authedUser,
        token: token,
        message: "Logged in successfully!s",
      });
    })
    .catch((error) => {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    });
});

module.exports = router;
