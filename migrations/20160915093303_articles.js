exports.up = function(knex, Promise) {
  return knex.schema.createTable("articles", function(table) {
    table.increments();
    table.string("title");
    table.text("body");
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("articles");
};
