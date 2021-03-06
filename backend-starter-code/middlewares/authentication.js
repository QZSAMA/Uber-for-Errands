const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Users = require('../models').Users;

function passwordsMatch(passwordSubmitted, storedPassword) {
  return bcrypt.compareSync(passwordSubmitted, storedPassword);
}

passport.use(new LocalStrategy({
    usernameField: 'email',
  },
  (email, password, done) => {
    Users.findOne({
      where: { email },
    }).then((users) => {
      if(!users) {
        return done(null, false, { message: 'Incorrect email.' });
      }

      if (passwordsMatch(password, users.password_hash) === false) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, users, { message: 'Successfully Logged In!' });
    });
  })
);

passport.serializeUser((users, done) => {
  done(null, users.id);
});

passport.deserializeUser((id, done) => {
  Users.findById(id).then((users) => {
    if (!users) {
      return done(null, false);
    }

    return done(null, users);
  });
});

passport.redirectIfLoggedIn = (route) =>
  (req, res, next) => (req.users ? res.redirect(route) : next());

passport.redirectIfNotLoggedIn = (route) =>
  (req, res, next) => (req.users ? next() : res.redirect(route));

module.exports = passport;
