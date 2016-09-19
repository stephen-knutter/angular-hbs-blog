
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tags').del()
    .then(function() {
      return Promise.all([
        // Inserts seed entries
        knex('tags').insert({tag: 'PHP'}),
        knex('tags').insert({tag: 'Laravel'}),
        knex('tags').insert({tag: 'JavaScript'}),
        knex('tags').insert({tag: 'Node.js'}),
        knex('tags').insert({tag: 'AngularJS'}),
        knex('tags').insert({tag: 'MongoDB'}),
        knex('tags').insert({tag: 'ReactJS'}),
        knex('tags').insert({tag: 'Ionic'}),
        knex('tags').insert({tag: 'Meteor'}),
        knex('tags').insert({tag: 'Express.js'})
      ]);
    });
};
