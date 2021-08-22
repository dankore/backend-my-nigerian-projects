const express = require('express');
const server = express();
const cors = require('cors');
const apiRouter = require('./apiRouter');

server.use(cors());
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use('/', apiRouter);

module.exports = server
