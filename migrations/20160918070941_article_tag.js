
exports.up = function(knex, Promise) {
  return knex.schema.createTable("article_tag", function(table) {
    table.increments();
    table.integer("article_id");
    table.integer("tag_id");
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("article_tag");
};
