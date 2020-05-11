const usersCollection = require('../../db').db().collection('users');

let User = class user_ {
  constructor(data) {
    this.data = data;
  }
};

User.prototype.register = function () {
  return new Promise(async (resolve, reject) => {
   usersCollection.insertOne(this.data)
   .then(info=>{
     console.log(info.ops);
     resolve("User created.")
   })
  });
};



module.exports = User;