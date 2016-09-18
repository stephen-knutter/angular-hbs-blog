var express = require('express');
var router = express.Router();
var query = require('../database/query');
var expressJWT = require('express-jwt');

var auth = expressJWT({secret: process.env.SECRET, requestProperty: 'payload'});

/* GET all Articles. */
router.get('/', function(req, res, next) {
  query.getArticlesWithTags().then(function(data) {
    res.json(data);
  });
});

router.get('/tags', function(req, res, next) {
  query.getAllArticleTags().then(function(data) {
    res.json(data);
  });
});

router.post('/', auth, function(req, res, next) {
  var article = req.body;

  query.addArticle(article).then(function(data) {
    res.json(data);
  });
});

module.exports = router;
