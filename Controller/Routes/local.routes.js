// localhost:3000/auth/local/<Rout Name>
const Router = require("express").Router(),
  User = require("../../Model/user.model"),
  nodemailer = require("nodemailer");

Router.post("/signup", (req, res) => {
  console.log("signup m aa gye");
  let errors = [];
  let usernameIsGood = req.body.username.length > 0;
  let licnoIsGood = req.body.licno.length > 0;
  let emailIsGood = req.body.email.length > 0;
  if (!usernameIsGood) errors.push("username field must be filled");
  if (!licnoIsGood) errors.push("password field must be filled");
  if (!emailIsGood) errors.push("username field must be filled");
  console.log(usernameIsGood + licnoIsGood + "all good");
  User.findOne({ username: req.body.username })
    .then(user => {
      if (user) {
        usernameAlreadyChosen = true;
        errors.push("username", req.body.username, "is already in use");
      } else {
        usernameAlreadyChosen = false;
      }
    }) //end of then
    .then(() => {
      if (errors.length > 0) {
        res.redirect("/");
      } else {
        let newuser = new User();
        newuser.username = req.body.username;
        newuser.email = req.body.email;
        newuser.licno = req.body.licno;
        newuser.hours = req.body.hours;
        console.log(newuser);

        newuser.save((err, user) => {
          console.log(user);
          if (err) {
            return res.send({
              success: false,
              message: "Error: Server error"
            });
          }
          req.session.user = user;
          res.redirect("/dashboard");
        });
      }
    });
}); //end of then

module.exports = Router;
