var express = require('express');
var router = express.Router();
var passport = require('../passport');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');

var auth = expressJWT({secret: process.env.SECRET, userProperty: 'payload'});

router.post('/login', function(req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({message: 'One or more fields blank'});
  }

  passport.authenticate('local', function(err, user, info) {
    if (err) return next(err);

    if (user) {
      var today = new Date();
      var exp = new Date(today);
      exp.setDate(today.getDate() + 60);

      var token = jwt.sign({
        id: user.id,
        username: user.username,
        exp: parseInt(exp.getTime() / 1000)
      }, process.env.SECRET);

      return res.json({token: token});
    }
    return res.status(401).json(info);
  })(req, res, next);
});

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
