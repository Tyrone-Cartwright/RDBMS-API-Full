const knex = require("knex");
const express = require("express");
const knexConfig = require("./knexfile.js");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(morgan("short"));
server.use(cors());
// connect to databasse
const db = knex(knexConfig.development);

server.get("/", (req, res) => {
  res.send("api working");
});

server.get("/api/cohorts", (req, res) => {
  db("cohorts")
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(err => res.status(500).json(err));
});

server.get("/api/cohorts/:id/students", (req, res) => {
  db("students")
    .where({ cohort_id: req.params.id })
    .then(students => {
      if (students) {
        res.status(200).json(students);
      } else {
        res.status(404).json({ message: "Cohort not found" });
      }
    });
});

server.get("/api/cohorts/:id", (req, res) => {
  db("cohorts")
    .where({ id: req.params.id })
    .then(cohorts => {
      if (cohorts.length != 0) {
        res.status(200).json(cohorts);
      } else {
        res.status(404).json({ message: "Cohort not found" });
      }
    });
});

server.post("/api/cohorts", (req, res) => {
  if (req.body.name) {
    db("cohorts")
      .insert(req.body)
      .then(id => {
        res.status(201).json(id);
      })
      .catch(err => {
        res
          .status(404)
          .json({ error: "Cohort name already exist, Try Again", error: err });
      });
  } else {
    res.status(500).json({ message: "Please enter a cohort name" });
  }
});

server.put("/api/cohorts/:id", (req, res) => {
  if (req.body.name) {
    db("cohorts")
      .where({ id: req.params.id })
      .update(req.body)
      .then(count => {
        if (count >= 1) {
          res.status(200).json(count);
        } else {
          res.status(404).json({ message: "Cohort already exists" });
        }
      })
      .catch();
  } else {
    res.status(500).json({ error: "Please provide a name to update" });
  }
});

server.delete("/api/cohorts/:id", (req, res) => {
  db("cohorts")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count >= 1) {
        res.status(200).json({ count: `Cohort has been deleted` });
      } else {
        res
          .status(404)
          .json({ error: "Cohort with the specified ID could not be found" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "Something went wrong, Try Again" });
    });
});

// Students
server.get("/students", (req, res) => {
  db("students")
    .then(students => {
      res.status(200).json(students);
    })
    .catch(err => res.status(500).json(err));
});

server.get("/students/:id", (req, res) => {
  db("students")
    .select("students.id", "students.name", "cohorts.name as cohort")
    .from("students")
    .innerJoin("cohorts", "cohorts.id", "=", "students.cohort_id")
    .where("students.id", req.params.id)
    .then(students => {
      if (students.length != 0) {
        res.status(200).json(students);
      } else {
        res.status(404).json({ message: "Student not found" });
      }
    });
});

server.post("/students", (req, res) => {
  db("students")
    .insert(req.body)
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err => {
      res.status(404).json({
        error: "Student's name already exist, Try Again",
        error: err
      });
    });
});

server.put("/students/:id", (req, res) => {
  if (req.body.name && req.body.cohort_id) {
    db("students")
      .where({ id: req.params.id })
      .update(req.body)
      .then(count => {
        if (count >= 1) {
          res.status(200).json(count);
        } else {
          res.status(404).json({ message: "Student already exists" });
        }
      })
      .catch();
  } else {
    res.status(500).json({
      error: "Please provide a student's name and cohorts Id to update"
    });
  }
});

server.delete("/students/:id", (req, res) => {
  db("students")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count >= 1) {
        res.status(200).json({ count: `Student has been deleted` });
      } else {
        res
          .status(404)
          .json({ error: "Student with the specified ID could not be found" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "Something went wrong, Try Again" });
    });
});

server.listen(6000, () => console.log("server on 6k"));
