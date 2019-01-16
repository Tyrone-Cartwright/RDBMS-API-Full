const knex = require("knex");
const express = require("express");
const knexConfig = require("./knexfile.js");

const server = express();

server.use(express.json());

// connect to databasse
const db = knex(knexConfig.development);

server.get("/", (req, res) => {
  res.send("api working");
});

server.listen(6000, () => console.log("server on 6k"));
