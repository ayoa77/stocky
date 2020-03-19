function needAuth(req, res, next) {
  if (req.session.user || "test" == req.app.get("env")) next();
  else {
    req.flash("message", "Please login first.");
    res.redirect("/users/login");
  }
}

function noAuth(req, res, next) {
  if (req.session.user) {
    req.flash("error", "You're already signed in.");
    res.redirect("/stocks");
  } else next();
}

module.exports = { noAuth, needAuth };
