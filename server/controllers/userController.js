const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// TOKEN EXPIRY
const tokenLasts = '30d';

exports.apiRegister = (req, res) => {
  console.log({ controller: req.body });

  let user = new User(req.body);
  user
    .register()
    .then(response => {
      res.json({
        token: jwt.sign(
          {
            _id: user.data._id,
            username: user.data.username,
            avatar: user.avatar,
          },
          process.env.JWTSECRET,
          { expiresIn: tokenLasts }
        ),
        username: user.data.username,
        avatar: user.avatar,
      });
    })
    .catch(err => {
      res.status(500).send('Error');
    });
};

exports.apiDoesUsernameExist = (req, res) => {
  User.findByUsername(req.body.username)
    .then(() => {
      res.json(true);
    })
    .catch(error => {
      res.json(error);
    });
};

exports.apiDoesEmailExist = (req, res) => {
  User.findByEmail(req.body.email)
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      res.json(error);
    });
};

exports.apiCheckToken = (req, res) => {
  try {
    req.apiUser = jwt.verify(req.body.token, process.env.JWTSECRET);
  } catch (error) {
    res.json(false);
  }
};

exports.apiLogin = (req, res) => {
  let user = new User(req.body);
  
  user
    .login()
    .then(response => {
      res.json({
        token: jwt.sign(
          {
            _id: user.data._id,
            username: user.data.username,
            avatar: user.avatar,
          },
          process.env.JWTSECRET,
          { expiresIn: tokenLasts }
        ),
        username: user.data.username,
        avatar: user.avatar,
      });
    })
    .catch(() => {
      res.json(false);
    });
};
