var passport = require("passport");
var Strategy = require("passport-local").Strategy;
var query = require("./database/query");

passport.use(new Strategy(function(username, password, done) {
  query.findByUsername(username).then(function(user) {
    user = user[0];
    if (!user) done(null, false);

    var check = query.authenticateUser(password, user.password);
    if (!check) return done(null, false);
    done(null, user);
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  query.findByUsername(username).then(function(user) {
    user = user[0];
    if (!user) return false;
    done(null, user);
  });
});

module.exports = passport;
