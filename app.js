const express = require("express");
const app = express();
app.use(express.json());
const fs = require('fs')

const connectToMongo = require("./functions/connect");
connectToMongo();

const Club = require('./models/club')
const Player = require('./models/player')

// const saveToJson = (content, fileName) => {
//   fs.writeFile(`./${fileName}.json`, content, 'utf8', function (err) {
//       if (err) {
//           return console.log(err);
//       }
//       console.log("The file was saved!");
//   });
// }

// const readJson = async (fileName) => {
//   const data = fs.readFileSync(`./${fileName}.json`, 'utf8')
//   return data
// }

// const getPlayers = async () => {
//   let players = await readJson('db')
//   // players = JSON.parse(players)
//   players = new Map(JSON.parse(players))
//   return players
// }

// app.get("/", async (req, res) => {
//   // TODO: read all players
//   let players = await getPlayers()
//   console.log(players)
//   res.status(200).json(Array.from(players.entries()))
//   // res.status(200).json(players)
// });

// app.post("/", async (req, res) => {
//   // let players = await getPlayers()

//   // array
//   // players.push(req.body)
//   // console.log(players)
//   // saveToJson(JSON.stringify(players, null, 4), 'db')
//   // res.status(200).send()
//   // array

//   // map
//   let players = await getPlayers()
//   let id = req.body.id
//   delete req.body.id
//   players.set(id, req.body)
//   saveToJson(JSON.stringify(Array.from(players.entries()), null, 4), 'db')
//   res.status(200).send()
//   // map
// });



app.get('/mongo', async (req, res) => {
  console.log('mongo get')
  const clubs = await Club.find().lean()
  console.log(clubs)
  res.status(200).json(clubs)
})

app.post('/mongo', async (req, res) => {
  console.log('mongo')
  const data = req.body
  await Club.create(data)
  console.log(data)
  res.status(200).send()
})


app.get('/mongo/name', async (req, res) => {
  let club = await Club.findOne({ name: 'Leo' }).lean()
  res.status(200).json(club)
})

app.get('/mongo/:id', async (req, res) => {
  const { id } = req.params
  let club = await Club.findById(id)
  res.status(200).json(club)
})

app.get('/players', async (req, res) => {
  console.log('get players')
  let players = await Player.find({}, {cnp: 0}).lean()
  console.log(players)
  if(players.length == 0) return res.status(204).send()
  res.status(200).json(players)
})

app.get('/players/:county', async (req, res) => {
  let { county } = req.params
  console.log('get player')
  console.log(county)
  let object = { birthPlace: { county: county } }
  console.log(object)
  let player = await Player.findOne(object)
  res.status(200).json(player)
})

app.post('/players', async (req, res) => {
  console.log('post players')
  let data = req.body
  let player = await Player.create(data)
  console.log(player)
  return res.status(200).send()
})

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

app.put('/mongo/:id', async (req, res) => {
  let { id } = req.params
  await Club.findOneAndUpdate({ _id: id }, { name: "test" })
  return res.status(200).json({message: "Succes"})
})

app.put('/age/:id', async (req, res) => {
  let { id } = req.params
  let player = await Player.findById(id)
  let year = player.birthday.getFullYear()
  await Player.findOneAndUpdate({ _id: id }, { age: year })
  return res.status(200).json({message: "Succes"})
})

app.delete('/players/:id', async (req, res) => {
  const { id } = req.params
  let player = await Player.findByIdAndDelete({ _id: id })
  return res.status(200).json(player)
})

module.exports = app;
