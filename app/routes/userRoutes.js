const express = require("express");
const router = express.Router();
const { User } = require("../models/userModel");

// Get Signup page
router.get("/", (req, res, next) => {
  res.render("signup", {
    title: "Signup",
    user: req.session.user,
    csrfToken: req.csrfToken()
  });
});

// Get login page
router.get("/login", (req, res, next) => {
  res.render("login", { title: "Login", csrfToken: req.csrfToken() });
});

// Post Signup
router.post("/", (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  const regexForSpaces = /\s/;
  //testing password before it is hashed
  if (password.length < 8)
    return res.status(400).json({
      message: "Sorry, password must be longer than 6 characters in length.",
      redirect: false
    });
  else if (regexForSpaces.test(password))
    return res.status(400).json({
      message: "Sorry, password cannot contains spaces.",
      redirect: false
    });
  else if (password !== confirmPassword)
    return res.status(400).json({
      message: "Sorry, passwords don't match, please try again.",
      redirect: false
    });
  else {
    const user = new User({ email: email, password: password });
    user.save(err => {
      if (err && err.code === 11000) {
        // Duplicate username error
        return res.status(422).send({
          message: "Email exists. Try logging in.",
          redirect: false
        });
      } else if (err) {
        return res.status(400).json({
          message: err.message || "There was a problem registering your user.",
          redirect: false
        });
      } else {
        //set the user's session
        delete user.password;
        req.session.user = user;
        return res.status(200).json({
          message: "You have successfully signed up.",
          redirect: `/stocks`
        });
      }
    });
  }
});

// Post Login
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email: email })
    .then(user => {
      if (!user)
        return res.status(400).json({
          message: "Email and password do not match.",
          redirect: false
        });
      else if (!user.validPassword(password))
        return res.status(400).json({
          message: "Email and password do not match.",
          redirect: false
        });
      else {
        //set the user's session
        delete user.password;
        req.session.user = user;
        return res.status(200).json({
          message: "You have successfully signed up.",
          redirect: "/stocks"
        });
      }
    })
    .catch(err => {
      return res.status(400).json({
        message: err.message || "There was a problem authenticating your user.",
        redirect: false
      });
    });
});

module.exports = router;
