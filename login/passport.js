let mongoose = require('mongoose');
let User = require('../models/user');
var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;


/* Login validation */
passport.use('local.login', new LocalStrategy(
  function (username, password, done) {
    User.findOne({
      username: username
    }, function (err, user) {
      if (err) {
        console.log("error happened")
        return done(err);
      }
      if (!user) {
        console.log("no user")
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }
      if (user.password != password) {
        console.log("incorrect password")
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }
      return done(null, user);
    });
  }
));

/* Signup validation */
passport.use('local.signup', new LocalStrategy(function (username, password, done) {
  User.findOne({
    username: username
  }, function (err, user) {
    if (user != null) {
      return done(null, false, {
        message: 'The username already exists'
      });
    } else {
      let newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        username: username,
        password: password
      });
      newUser.save({
        username: username,
        password: password
      }, function (err, user) {
        if (err) {
          return done(err)
        }
        return done(null, user);
      })
    }
  })

}))

passport.serializeUser(function (user, done) {
  done(null, user.username);
});

passport.deserializeUser(function (username, done) {
  User.findOne({
    username: username
  }, function (err, user) {
    if (err) {
      return done(err);
    }
    done(null, user);
  });
});

passport.authenticateMiddleware = function authenticationMiddleware() {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json();
  }
};

module.exports = passport;
