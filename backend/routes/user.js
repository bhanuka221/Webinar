const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const constants = require("../utils/Constant");
const nodemailer = require("nodemailer");
const sendGridTrasport = require("nodemailer-sendgrid-transport");
const router = express.Router();

const trasporter = nodemailer.createTransport(
  sendGridTrasport({
    auth: {
      api_key: constants.SEND_GRID_MAIL_API,
    },
  })
);

router.post("/forgetPassword", (req, res, next) => {
  const { email } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Email doesn't exist!",
        });
      }

      const token = jwt.sign(
        {
          email: user.email,
          userId: user._id,
        },
        constants.JWT_PRIVATE_KEY,
        { expiresIn: "1h" }
      );

      forgetPasswordToken;

      User.findOneAndUpdate({ _id: user._id }, { forgetPasswordToken: token });

      trasporter.sendMail({
        to: user.email,
        from: "bhanuka152@gmail.com",
        subject: "Password Reset",
        html: `
      <h4>Click this <a href="${constants.FRONT_END_DOMAIN}/reset/${token}">link</a> to reset the password</h4>
      `,
      }).then(result => {
        return res.status(201).json({
          message: "Check the email for reset link",
        });
      }).catch(error => {
        return res.status(404).json({
          message: "Unable to send email. Try again",
        });
      });
    })
});

router.post("/reset-password", (req, res, next) => {
  const newPassword = req.body.password
  const forgetPasswordToken = req.body.token
  User.findOne({forgetPasswordToken:forgetPasswordToken}).then(user => {
    if(!user){
      return res.status(500).json({
        message: "Link has expired",
      });
    }

    bcrypt.hash(newPassword, 10).then( hash => {
      User.findOneAndUpdate({_id:user._id},{forgetPasswordToken:'',password:hash}).then(result => {
        return res.status(201).json({
          message:"Password reset successfull!"
        })
      }).catch(error => {
        return res.status(201).json({
          message:"Password reset failed!"
        })
      })
    })

  })
})

router.post("/signUp", (req, res, next) => {
  const { name, email, mobileNumber, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    const user = new User({
      name: name,
      email: email,
      password: hash,
      mobileNumber: mobileNumber,
      role: "USER",
    });

    trasporter
      .sendMail({
        to: email,
        from: "bhanuka152@gmail.com",
        subject: "Sign-up Success",
        html: "<h1>Welcome to the Webinar!<h1/>",
      })
      .then((result) => {
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
      })
      .catch((error) => {
        res.status(404).json({
          error: error,
          message: "Invalid Email Address",
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
