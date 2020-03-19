const express = require("express");
const router = express.Router();
const request = require("request"); 
const moment = require("moment"); 

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("stocks", {
    title: "Stocks",
    user: req.session.user,
    csrfToken: req.csrfToken()
  });
});

router.post("/", (req, res, next) => {
  let stockSymbol = req.body.stockSymbol.toUpperCase();
  let url = `https://finnhub.io/api/v1/quote?symbol=${stockSymbol}&token=${process.env.FINNHUB_SECRET}`;
  request(url,
    { json: true },
    (err, result, body) => {
      if (err || body.t === 0) {
        return res.status(404).send({
          message: `Are you sure ${stockSymbol} is a real stock symbol?`,
        });
      }else {
        let date = moment.unix(body.t).format("'MMM D, YYYY, HH:mmA'");
        body.t = date;
        body.s = stockSymbol;
        return res.status(200).send({
          response:body
        });
      }
    }
  );
});

module.exports = router;
