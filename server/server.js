const express = require("express");
const server = express();
const PortNumber = 8080;
const router = require("./router");

server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use("/", router);


module.exports = server;
