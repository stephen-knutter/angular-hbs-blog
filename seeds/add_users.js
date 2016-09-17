
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function() {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({
          username:
            'stephen-knutter',
          email:
            'stephen.knutter@gmail.com',
          password:
            '$2a$10$mn6v/nsFmBxvi.mx/awwnuCfCOzD96bQLHSGydsCvQ3syFkQYvdX2'
        })
      ]);
    });
};
