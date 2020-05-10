const express = require("express");
const server = express();
const PortNumber = 8080;

server.get("/", (req, res)=>{
  res.send("hi")
});

server.listen(PORT, ()=>{
  console.log(`Listening on port number: ${PortNumber}`)
})