// localhost:3000/<Route>

const Router = require("express").Router(),
  path = require("path");

Router.get("/", (req, res) => {
  if (!req.session.user) {
    res.redirect("/signup");
  } else {
    res.redirect("/dashboard");
  }
});

Router.get("/signup", (req, res) => {
  if (!req.session.user) {
    res.render("signup");
  } else {
    res.redirect("/dashboard");
  }
});

Router.get("/dashboard", (req, res) => {
  if (req.session.user || req.user) {
    let user = req.session.user || req.user;
    res.render("dashboard");
  } else {
    res.redirect("/");
  }
});
Router.get("/logout", function(req, res) {
  console.log("logging out : " + req.session.user || req.user);
  req.session.destroy(function(err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

module.exports = Router;
