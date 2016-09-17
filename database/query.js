var knex = require('./config');
var bcrypt = require('bcrypt');

var query = {
  getAllArticles: function() {
    return knex('articles').orderBy('created_at', 'desc');
  },
  addArticle: function(article) {
    var title = article.title;
    var body = article.body;

    return knex('articles').insert({
      title: title,
      body: body
    });
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
