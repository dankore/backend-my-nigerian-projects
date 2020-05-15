const express = require('express');
const server = express();
const apiRouter = require('./apiRouter');

server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use('/', apiRouter);

module.exports = server;
