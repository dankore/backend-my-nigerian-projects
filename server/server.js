const express = require('express');
const server = express();
const cors = require('cors');
const apiRouter = require('./apiRouter');

// server.use(function (_, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

const corsOptions = {
  origin: 'https://api.mynigerianprojects.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

server.use(cors(corsOptions));
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use('/', apiRouter);

module.exports = server
