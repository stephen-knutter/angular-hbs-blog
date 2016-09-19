
exports.up = function(knex, Promise) {
  return knex.schema.createTable("article_tag", function(table) {
    table.increments();
    table
      .integer("article_id")
      .references('id')
      .inTable('articles')
      .onDelete('CASCADE');
    table
      .integer("tag_id")
      .references('id')
      .inTable('tags')
      .onDelete('CASCADE');
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
    table.unique(['article_id', 'tag_id']);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("article_tag");
};
