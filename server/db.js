require("dotenv").config();
const PORTNUMBER = process.env.PORTNUMBER;
const mongodb = require("mongodb");

mongodb.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
  module.exports = client;
  const server = require("./server");
  server.listen(PORTNUMBER, () => {
    console.log(`Listening on port number: ${PORTNUMBER}`);
  });
});
