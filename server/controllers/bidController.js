const Bid = require('../models/bidModel');

exports.apiCreate = function (req, res) {
  let bid = new Bid(req.body, req.apiUser._id);

  bid
    .create()
    .then(function (newId) {
      res.json(newId);
    })
    .catch(function (errors) {
      res.json(errors);
    });
};

exports.apiUpdate = function (req, res) {
  let bid = new Bid(req.body, req.apiUser._id, req.params.id);

  bid
    .update()
    .then(status => {
      // the bid was successfully updated in the database
      // or user did have permission, but there were validation errors
      if (status == 'success') {
        res.json('success');
      } else {
        res.json('failure');
      }
    })
    .catch(() => {
      // a bid with the requested id doesn't exist
      // or if the current visitor is not the owner of the requested bid
      res.json('no permissions');
    });
};

exports.apiDelete = function (req, res) {
  Bid.delete(req.params.id, req.apiUser._id)
    .then(() => {
      res.json('Success');
    })
    .catch(() => {
      res.json('You do not have permission to perform that action.');
    });
};

exports.search = function (req, res) {
  Bid.search(req.body.searchTerm)
    .then(bids => {
      res.json(bids);
    })
    .catch(() => {
      res.json([]);
    });
};

exports.reactApiViewSingle = async function (req, res) {
  try {
    let bid = await Bid.findSingleById(req.params.id, 0);
    res.json(bid);
  } catch {
    res.json(false);
  }
};
