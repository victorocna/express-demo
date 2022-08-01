#!/usr/bin/env node

const http = require("http");
const app = require("./app");

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen("9000", () => {
  console.log("Listening on port 9000");
});

// const { id } = req.db;
  // const documents=  db.findOne({id:id});
  //  if(documents){
  //    return res.status(404).json({message:'Player not found'})
  // }
  // else{
  //   console.log("Succes");
  // }
  