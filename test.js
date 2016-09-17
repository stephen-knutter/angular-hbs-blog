var query = require("./database/query");

var user = query.findByUsername('stephen-knutter').then(function(user) {
  // console.log(user[0].password);
  var password = 'a48094809';
  var passwordDigest = user[0].password;
  var check = query.authenticateUser(password, passwordDigest);
  console.log(check);
});
