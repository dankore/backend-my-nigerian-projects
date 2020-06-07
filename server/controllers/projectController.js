const Project = require('../models/projectModel');

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
  console.log(req.body)
}
