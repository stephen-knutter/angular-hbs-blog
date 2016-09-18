var knex = require('./config');
var bcrypt = require('bcrypt');

var query = {
  getAllArticles: function() {
    return knex('articles').orderBy('articles.created_at', 'desc');
  },
  getArticlesWithTags: function() {
    return knex.raw(
        'SELECT articles.*, array_agg(tags.tag ORDER BY tags.tag) AS tags ' +
        'FROM articles ' +
        'LEFT JOIN article_tag ON articles.id = article_tag.article_id ' +
        'LEFT JOIN tags ON article_tag.tag_id = tags.id ' +
        'GROUP BY articles.id ' +
        'ORDER BY articles.created_at DESC'
      );
  },
  addArticle: function(article) {
    var title = article.title;
    var body = article.body;
    var tags = article.tags;

    return knex('articles')
      .insert({title: title, body: body})
      .returning('id')
      .then(function(response) {
        if (tags.length) {
          var inserts = [];
          for (var i = 0; i < tags.length; i++) {
            var query = knex('article_tag')
              .insert({article_id: response[0], tag_id: tags[i].id});
            inserts.push(query);
          }
          return Promise.all(inserts);
        }
      });
  },
  getAllArticleTags: function() {
    return knex('tags').select('id', 'tag');
  },
  getAllUsers: function() {
    return knex('users');
  },
  findByUsername: function(username) {
    return this.getAllUsers().where('username', username);
  },
  authenticateUser: function(password, passwordDigest) {
    return bcrypt.compareSync(password, passwordDigest, function(err, isMatch) {
      if (err) return false;

      return isMatch;
    });
  }
};

module.exports = query;
