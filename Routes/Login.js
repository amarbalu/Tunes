const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const app = express.Router();
var multer = require("multer");
app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/dashboard",
    failureRedirect: "/login/error",
  }),
  function (req, res) {
    res.send(req.user);
  }
);
app.get("/login_auth", (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.status(500).send("Error cannot proceed");
  }
});
app.get("/profile", (req, res) => {
  // res.send(req.user)
  // res.redirect("/dashboard")
});
app.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    scope: ["public_profile", "email"],
  })
);
// app.get('/auth/facebook',passport.authenticate('facebook'));

module.exports = app;
