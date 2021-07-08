exports.up = function(knex, Promise) {
  return knex.schema.createTable("cohorts", function(tbl) {
    // Primary key
    tbl.increments();

    // // Name field
    tbl.string("name", 128).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("cohorts");
};
