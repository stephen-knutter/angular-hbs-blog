var express = require('express');
var router = express.Router();
var query = require('../database/query');
var expressJWT = require('express-jwt');

var auth = expressJWT({secret: process.env.SECRET, requestProperty: 'payload'});

/* GET all Articles. */
router.get('/', function(req, res, next) {
  query.getAllArticles().then(function(data) {
    res.json(data);
  });
});

router.post('/', auth, function(req, res, next) {
  var article = req.body;
  // article.author = req.payload.username;
  // console.log(req.payload);
  query.addArticle(article).then(function(data) {
    res.json(data);
  });
});

module.exports = router;
