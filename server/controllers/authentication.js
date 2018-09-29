const User = require("../model/user");
const jwt = require("jwt-simple");
const config = require("../config");

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
  //User has already had email and password auth, need token
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = function(req, res, next) {
  console.log(req.body);
  console.log("Secret", config.secret);
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "You must provide email and password" });
  }

  //See if a user with the given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      return next(err);
    }
    //If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: "Email is in use" });
    }
    //If a user with email does not exist, create and save user rec
    const user = new User({
      email: email,
      password: password
    });

    user.save(function(err) {
      if (err) {
        return next(err);
      }

      //Response to request indicating the user was created
      res.json({ token: tokenForUser(user) });
    });
  });
};
