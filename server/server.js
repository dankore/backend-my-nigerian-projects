const express = require('express');
const server = express();
const cors = require('cors');
const apiRouter = require('./apiRouter');
const morgan = require('morgan');
const helmet = require('helmet');

server.use(helmet());
server.use(morgan('tiny'));
server.use(cors());
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use('/', apiRouter);

module.exports = server;
