const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render("index", {
    title: "Stocks",
    user: req.session.user,
    flash: res.locals.flash
  });
});

module.exports = router;
