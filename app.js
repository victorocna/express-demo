const express = require("express");
const app = express();

app.get("/", (req, res) => {
  // TODO: read all players
});

app.post("/", (req, res) => {
  // TODO: write player to file
});

app.get("/:id", (req, res) => {
  // TODO: read player by id
});

module.exports = app;
