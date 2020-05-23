const projectsCollection = require('../../db').db().collection('projects');
const followsCollection = require('../../db').db().collection('follows');
const usersCollection = require('../../db').db().collection('users');
const ObjectID = require('mongodb').ObjectID;
const User = require('./userModel');
const sanitizeHTML = require('sanitize-html');

let Project = function (data, userid, requestedProjectId) {
  this.data = data;
  this.errors = [];
  this.userid = userid;
  this.requestedProjectId = requestedProjectId;
};

Project.prototype.cleanUp = function () {
  if (typeof this.data.title != 'string') {
    this.data.title = '';
  }
  if (typeof this.data.description != 'string') {
    this.data.description = '';
  }

  // get rid of any bogus properties
  this.data = {
    title: sanitizeHTML(this.data.title.trim(), { allowedTags: [], allowedAttributes: {} }),
    description: sanitizeHTML(this.data.description.trim(), { allowedTags: [], allowedAttributes: {} }),
    createdDate: new Date(),
    author: ObjectID(this.userid),
  };
};

Project.prototype.validate = function () {
  if (this.data.title == '') {
    this.errors.push('You must provide a title.');
  }
  if (this.data.description == '') {
    this.errors.push('You must provide project content.');
  }
};

Project.prototype.create = function () {
  return new Promise((resolve, reject) => {
    this.cleanUp();
    this.validate();
    if (!this.errors.length) {
      // save project into database
      projectsCollection
        .insertOne(this.data)
        .then(info => {
          resolve(info.ops[0]._id);
        })
        .catch(() => {
          this.errors.push('Please try again later.');
          reject(this.errors);
        });
    } else {
      reject(this.errors);
    }
  });
};

Project.prototype.update = function () {
  return new Promise(async (resolve, reject) => {
    try {
      let project = await Project.findSingleById(this.requestedProjectId, this.userid);
      if (project.isVisitorOwner) {
        // actually update the db
        let status = await this.actuallyUpdate();
        resolve(status);
      } else {
        reject();
      }
    } catch {
      reject();
    }
  });
};

Project.prototype.actuallyUpdate = function () {
  return new Promise(async (resolve, reject) => {
    this.cleanUp();
    this.validate();
    if (!this.errors.length) {
      await projectsCollection.findOneAndUpdate({ _id: new ObjectID(this.requestedProjectId) }, { $set: { title: this.data.title, description: this.data.description } });
      resolve('success');
    } else {
      resolve('failure');
    }
  });
};

Project.reusableProjectQuery = function (uniqueOperations, visitorId) {
  return new Promise(async function (resolve, reject) {
    let aggOperations = uniqueOperations.concat([
      { $lookup: { from: 'users', localField: 'author', foreignField: '_id', as: 'authorDocument' } },
      {
        $project: {
          title: 1,
          description: 1,
          firstName: 1,
          lastName: 1,
          createdDate: 1,
          authorId: '$author',
          author: { $arrayElemAt: ['$authorDocument', 0] },
        },
      },
    ]);

    let projects = await projectsCollection.aggregate(aggOperations).toArray();

    // clean up author property in each project object
    projects = projects.map(function (project) {
      project.isVisitorOwner = project.authorId.equals(visitorId);
      project.authorId = undefined;

      project.author = {
        username: project.author.username,
        firstName: project.author.firstName,
        lastName: project.author.lastName,
        avatar: new User(project.author, true).avatar,
      };

      return project;
    });

    resolve(projects);
  });
};

Project.findSingleById = function (id, visitorId) {
  return new Promise(async function (resolve, reject) {
    if (typeof id != 'string' || !ObjectID.isValid(id)) {
      reject();
      return;
    }

    let projects = await Project.reusableProjectQuery([{ $match: { _id: new ObjectID(id) } }], visitorId);

    if (projects.length) {
      resolve(projects[0]);
    } else {
      reject();
    }
  });
};

Project.findByAuthorId = function (authorId) {
  return Project.reusableProjectQuery([{ $match: { author: authorId } }, { $sort: { createdDate: -1 } }]);
};

Project.delete = function (projectIdToDelete, currentUserId) {
  return new Promise(async (resolve, reject) => {
    try {
      let project = await Project.findSingleById(projectIdToDelete, currentUserId);
      if (project.isVisitorOwner) {
        await projectsCollection.deleteOne({ _id: new ObjectID(projectIdToDelete) });
        resolve();
      } else {
        reject();
      }
    } catch {
      reject();
    }
  });
};

Project.search = function (searchTerm) {
  return new Promise(async (resolve, reject) => {
    if (typeof searchTerm == 'string') {
      let projects = await Project.reusableProjectQuery([{ $match: { $text: { $search: searchTerm } } }, { $sort: { score: { $meta: 'textScore' } } }]);
      resolve(projects);
    } else {
      reject();
    }
  });
};

Project.countProjectsByAuthor = function (id) {
  return new Promise(async (resolve, reject) => {
    let projectCount = await projectsCollection.countDocuments({ author: id });
    resolve(projectCount);
  });
};

Project.getFeedWithoutLoggingIn = () => {
  return new Promise(async (resolve, reject) => {
    // GET ALL USER IDS
    let allUserIds = await usersCollection.distinct('_id');

    // GET ALL PROJECTS, IF ANY, THAT THE ABOVE IDS AUTHORED
    let allProjects = await Project.reusableProjectQuery([{ $match: { author: { $in: allUserIds } } }, { $sort: { createdDate: -1 } }]);

    resolve(allProjects);
  });
};

Project.getFeed = async function (id) {
  // create an array of the user ids that the current user follows
  let followedUsers = await followsCollection.find({ authorId: new ObjectID(id) }).toArray();

  followedUsers = followedUsers.map(function (followDoc) {
    return followDoc.followedId;
  });

  // look for projects where the author is in the above array of followed users
  return Project.reusableProjectQuery([{ $match: { author: { $in: followedUsers } } }, { $sort: { createdDate: -1 } }]);
};

module.exports = Project;