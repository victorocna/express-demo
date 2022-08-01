const express = require("express");
const players = require("./players");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  // TODO: read all players
  res.send(players);
});

app.post("/", (req, res) => {
  // TODO: write player to file
  console.log(req.body);
  res.status(201).send("Created Player");
});

app.get("/:id", (req, res) => {
  // TODO: read player by id
  const found = players.some((player) => player.id === parseInt(req.params.id));
  if (found) {
    res.json(players.filter((player) => player.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ message: "Player not found" });
  }
  //
});

module.exports = app;
