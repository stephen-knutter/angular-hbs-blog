var express = require('express');
var router = express.Router();
var query = require('../database/query');
var expressJWT = require('express-jwt');

var auth = expressJWT({secret: process.env.SECRET, userProperty: 'payload'});

/* GET all Articles. */
router.get('/', function(req, res, next) {
  query.getArticlesWithTags().then(function(data) {
    res.json(data);
  });
});

router.post('/', auth, function(req, res, next) {
  var article = req.body;

  query.addArticle(article).then(function(data) {
    res.json(data);
  });
});

router.put('/:id/edit', auth, function(req, res, next) {
  var article = req.body;
  var articleId = req.params.id;

  query.updateArticle(articleId, article).then(function(data) {
    res.json(data);
  });
});

router.get('/tags', function(req, res, next) {
  query.getAllArticleTags().then(function(data) {
    res.json(data);
  });
});

router.get('/:id', function(req, res, next) {
  var articleId = req.params.id;

  query.getArticleById(articleId).then(function(data) {
    res.json(data);
  });
});

router.delete('/:id', auth, function(req, res, next) {
  var articleId = req.params.id;

  query.deleteArticle(articleId).then(function(data) {
    res.json(data);
  });
});

module.exports = router;
