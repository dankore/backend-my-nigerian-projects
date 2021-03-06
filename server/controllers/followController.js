const Follow = require('../models/followModel');

exports.apiAddFollow = function (req, res) {
  const data = {
    profileName: req.body.profileName,
    profileEmail: req.body.email,
    followerName: `${req.apiUser.firstName} ${req.apiUser.lastName}`,
  };
  let follow = new Follow(req.params.username, req.apiUser._id, data);

  follow
    .create()
    .then(() => {
      res.json(true);
    })
    .catch(errors => {
      res.json(false);
    });
};

exports.apiRemoveFollow = function (req, res) {
  let follow = new Follow(req.params.username, req.apiUser._id);
  follow
    .delete()
    .then(() => {
      res.json(true);
    })
    .catch(errors => {
      res.json(false);
    });
};
