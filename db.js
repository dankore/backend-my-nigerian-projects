require("dotenv").config();

const mongodb = require("mongodb");

mongodb.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
  module.exports = client;
  const PORTNUMBER = process.env.PORTNUMBER;
  const server = require("./server/server");
  server.listen(PORTNUMBER, () => {
    console.log(`Listening on port number: ${PORTNUMBER}`);
  });
});
