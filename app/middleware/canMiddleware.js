function needAuth(req, res, next) {
  if (req.session.user) next();
  else {
    req.flash("message", "Please login first.");
    res.redirect("/users/login");
  }
}
function noAuth(req, res, next) {
  if (req.session.user) res.redirect("/stocks");
  else next();
}

module.exports = {noAuth, needAuth};