const express = require('express');
const server = express();
const cors = require('cors');
const apiRouter = require('./apiRouter');

server.use(function (_, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// server.use(cors());
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use('/', apiRouter);

module.exports = server
