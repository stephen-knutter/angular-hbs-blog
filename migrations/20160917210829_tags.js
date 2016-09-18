exports.up = function(knex, Promise) {
  return knex.schema.createTable("tags", function(table) {
    table.increments();
    table.string("tag");
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable("tags");
};