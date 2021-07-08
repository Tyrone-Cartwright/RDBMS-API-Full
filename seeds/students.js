exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { name: "Victor", cohort_id: 2 },
        { name: "Cheryl", cohort_id: 1 },
        { name: "Samantha", cohort_id: 4 },
        { name: "Taylor", cohort_id: 5 },
        { name: "Amanda", cohort_id: 5 },
        { name: "Bobby", cohort_id: 1 },
        { name: "Tom", cohort_id: 4 },
        { name: "Bill", cohort_id: 3 }
      ]);
    });
};
