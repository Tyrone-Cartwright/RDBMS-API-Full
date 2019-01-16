exports.up = function(knex, Promise) {
  return knex.schema.createTable("students", function(stu) {
    stu.increments();

    stu.string("name", 128).notNullable();

    stu
      .integer("cohort_id")
      .unsigned()
      .references("id")
      .inTable("cohorts");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("students");
};
