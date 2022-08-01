const express = require("express");
const app = express();
app.use(express.json());
const fs = require('fs')


const saveToJson = (content, fileName) => {
  fs.writeFile(`./${fileName}.json`, content, 'utf8', function (err) {
      if (err) {
          return console.log(err);
      }
      console.log("The file was saved!");
  });
}

const readJson = async (fileName) => {
  const data = fs.readFileSync(`./${fileName}.json`, 'utf8')
  return data
}

const getPlayers = async () => {
  let players = await readJson('db')
  // players = JSON.parse(players)
  players = new Map(JSON.parse(players))
  return players
}

app.get("/", async (req, res) => {
  // TODO: read all players
  let players = await getPlayers()
  console.log(players)
  res.status(200).json(Array.from(players.entries()))
  // res.status(200).json(players)
});

app.post("/", async (req, res) => {
  // let players = await getPlayers()

  // array
  // players.push(req.body)
  // console.log(players)
  // saveToJson(JSON.stringify(players, null, 4), 'db')
  // res.status(200).send()
  // array

  // map
  let players = await getPlayers()
  let id = req.body.id
  delete req.body.id
  players.set(id, req.body)
  saveToJson(JSON.stringify(Array.from(players.entries()), null, 4), 'db')
  res.status(200).send()
  // map
});

app.get("/:id", async (req, res) => {
  let id = parseInt(req.params.id)
  let players = await getPlayers()
  // for (let player of players) {
  //   if (player.id == id) {
  //     res.status(200).json(player)
  //     return
  //   }
  // }
  // res.status(404).send()
  let player = players.get(id)
  if (player) res.status(200).json(player)
  else res.status(404).send()
});

module.exports = app;
