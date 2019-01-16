const express = require("express");

const server = express();

// connect to databasse

server.get("/", (req, res) => {
  res.send("api working");
});

server.listen(6000, () => console.log("server on  6k"));
