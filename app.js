const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (_req, res, next) => {
  try {
    const players = JSON.parse(fs.readFileSync('./db.json', 'utf8'))
    res.status(200).json(players)
  } catch (err) {
    next(err)
  }
})

app.post('/', (req, res, next) => {
  try {
    if (req.body.name && req.body.rating && req.body.club) {
      const db = JSON.parse(fs.readFileSync('./db.json', 'utf8'))
      const id = db.length + 1
      const newPlayer = {
        id,
        name: req.body.name,
        rating: req.body.rating,
        club: req.body.club
      }
      db.push(newPlayer)
      fs.writeFileSync('./db.json', JSON.stringify(db))
      res.status(200).json({
        status: 'ok',
        message: `Player with ID = ${id} has been created`,
        player: newPlayer
      })
    } else {
      res.status(400).json({
        status: 'error',
        message: 'Missing fields (name, rating and/or club)'
      })
    }
  } catch (err) {
    next(err)
  }
})

app.get('/:id', (req, res, next) => {
  try {
    const { id } = req.params
    const players = JSON.parse(fs.readFileSync('./db.json', 'utf8'))
    const player = players.find((element) => element.id === Number(id))
    if (player) {
      res.status(200).json({
        status: 'ok',
        message: `Player with ID = ${id} has been found`,
        player
      })
    } else {
      res.status(400).json({
        status: 'error',
        message: `Player with ID = ${id} not found`
      })
    }
  } catch (err) {
    next(err)
  }
})

app.put('/:id', (req, res, next) => {
  try {
    const { id } = req.params
    const players = JSON.parse(fs.readFileSync('./db.json', 'utf8'))
    const index = players.findIndex((element) => element.id === Number(id))
    if (index !== -1) {
      const newPlayer = { ...players[index], ...req.body }
      players[index] = newPlayer
      fs.writeFileSync('./db.json', JSON.stringify(players))
      res.status(200).json({
        status: 'ok',
        message: `Player with ID = ${id} has been updated`,
        player: newPlayer
      })
    } else {
      res.status(400).json({
        status: 'error',
        message: `Player with ID = ${id} not found`
      })
    }
  } catch (err) {
    next(err)
  }
})

app.delete('/:id', (req, res, next) => {
  try {
    const { id } = req.params
    const players = JSON.parse(fs.readFileSync('./db.json', 'utf8'))
    const index = players.findIndex((element) => element.id === Number(id))
    if (index !== -1) {
      players.splice(index, 1)
      fs.writeFileSync('./db.json', JSON.stringify(players))
      res.status(200).json({
        status: 'ok',
        message: `Player with ID = ${id} has been deleted`
      })
    } else {
      res.status(400).json({
        status: 'error',
        message: `Player with ID = ${id} not found`
      })
    }
  } catch (err) {
    next(err)
  }
})

app.use((err, _req, res, _next) => {
  console.error(`[ERROR]: ${err}`)
  res.status(500).json(err)
})

module.exports = app
