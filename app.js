const express = require("express");
const app = express();
const fs = require("fs");



app.get("/", (req, res) => {
  // TODO: read all players
  fs.readFile("./players.json", "utf-8", (err, jsonString) => {
    if (err) {
      return console.log("File read failed: ", err);
    }
    console.log("File data: ", jsonString);
  });
  // let data = "";
  // res.on("data", (chunk) => {
  //   data += chunk;
  // });

  // res.on("end", () => {
  //   console.log(JSON.parse(data).explanation);
  // });
  // res.send("Hello world!");
});
//   .on("error", (err) => {
//     console.log("Error " + err.message);
//   });

app.post("/", (req, res) => {
  //   // TODO: write player to file
});

app.get("/:id", (req, res) => {
  //   // TODO: read player by id
});

module.exports = app;
