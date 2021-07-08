exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("cohorts")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("cohorts").insert([
        { name: "WEB15" },
        { name: "UX/UI" },
        { name: "DS08" },
        { name: "WEB11" },
        { name: "IOS11" },
        { name: "Android10" }
      ]);
    });
};
