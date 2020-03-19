const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  console.log(res.locals._flashMessage);
  res.render("index", {
    title: "Stocks",
    user: req.session.user,
  });
});

module.exports = router;
