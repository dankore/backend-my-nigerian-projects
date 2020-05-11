const User = require('../models/userModel');

exports.apiRegister = (req, res) => {
  console.log(req.body);

  let user = new User(req.body);
  user
    .register()
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    });
};
