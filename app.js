const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.json());

const connectToMongo = require("./functions/connect");
connectToMongo();
const Club = require("./models/club");
const Player = require("./models/player");

app.post("/mongo", async (req, res) => {
  const data = req.body;
  await Club.create(data);

  return res.status(200).json(data);
});

app.get("/mongo", async (req, res) => {
  const clubs = await Club.find();

  return res.status(200).json(clubs);
});

app.get("/mongo/name", async (req, res) => {
  const club = await Club.findOne({ name: "Nume" }).lean();
  return res.status(200).json(club);
});

app.get("/mongo/:id", async (req, res) => {
  const { id } = req.params;
  const club = await Club.findById(id);
  return res.status(200).json(club);
});

app.post("/mongo/serban", async (req, res) => {
  const data = req.body;
  console.log(data);
  await Player.create(data);

  return res.status(200).json(data);
});

app.get("/mongo/serban/:id", async (req, res) => {
  const player = await Player.findOne({
    place: "B",
  });
  return res.status(200).json(player);
});

app.put("/mongo/:id", async (req, res) => {
  const { id } = req.params;
  await Club.findOneAndUpdate({ _id: id }, { name: "caine" });

  return res.status(200).json({ message: "Succes" });
});

app.put("/mongo/serban/:id", async (req, res) => {
  const { id } = req.params;
  const player = await Player.findById(id);
  const year = player.birthday.getFullYear();
  await Player.findOneAndUpdate({ _id: id }, { age: year });

  return res.status(200).json({ message: "Success" });
});

app.delete("/mongo/:id", async (req, res) => {
  const { id } = req.params;
  const club = await Club.findByIdAndDelete(id);
  return res.status(200).json(club);
});

app.delete("/mongo/serban/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const player = await Player.findByIdAndDelete(id);
  return res.status(200).json(player);
});

app.put("/mongo/visas/:id", async (req, res) => {
  const { id } = req.params;
  const { viza } = req.body;
  if (!id) {
    throw new Error("eroare");
  }
  const club = await Club.findById(id);
  if (!club) {
    throw new Error("eroare");
  }
  await club.update({ $push: { viza } });
});

module.exports = app;
