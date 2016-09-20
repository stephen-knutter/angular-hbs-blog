// Update with your config settings.
require('dotenv').config();

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/personal_blog'
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL
  }

};
