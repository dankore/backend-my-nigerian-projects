const Project = require('../models/projectModel');
const { response } = require('express');

exports.apiCreate = function (req, res) {
  let project = new Project(req.body, req.apiUser._id);

  project
    .create()
    .then(function (newId) {
      res.json(newId);
    })
    .catch(function (errors) {
      res.json(errors);
    });
};

exports.apiUpdate = function (req, res) {
  let project = new Project(req.body, req.apiUser._id, req.params.id);

  project
    .update()
    .then(status => {
      // the project was successfully updated in the database
      // or user did have permission, but there were validation errors
      if (status == 'success') {
        res.json('success');
      } else {
        res.json('failure');
      }
    })
    .catch(() => {
      // a project with the requested id doesn't exist
      // or if the current visitor is not the owner of the requested project
      res.json('no permissions');
    });
};

exports.apiDelete = function (req, res) {
  Project.delete(req.params.id, req.apiUser._id)
    .then(() => {
      res.json('Success');
    })
    .catch(() => {
      res.json('You do not have permission to perform that action.');
    });
};

exports.search = function (req, res) {
  Project.search(req.body.searchTerm)
    .then(projects => {
      res.json(projects);
    })
    .catch(() => {
      res.json([]);
    });
};

exports.apiViewSingle = async function (req, res) {
  try {
    let project = await Project.findSingleById(req.params.id, 0);
    res.json(project);
  } catch {
    res.json(false);
  }
};

exports.createBid = (req, res) => {
  const bidAuthor = {
    authorId: req.apiUser._id,
    username: req.apiUser.username,
  };

  req.body.bidAuthor = bidAuthor;
  let bid = new Project(req.body);

  bid
    .addBid()
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      res.json(error);
    });
};

exports.apiGetSingleBid = (req, res) => {
  Project.getSingleBid(req.body)
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      res.json(error);
    });
};

exports.apiDeleteBid = (req, res) => {
  Project.deleteBid(req.body)
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      res.json(error);
    });
};

exports.apiEditBid = (req, res) => {
    let editedBid = new Project(req.body);
    
    editedBid
        .saveEditedBid()
        .then(response => {
            res.json(response);
        })
        .catch(error=>{
            res.json(error);
        })
}