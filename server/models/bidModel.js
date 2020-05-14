const bidsCollection = require('../../db').db().collection('bids');
const followsCollection = require('../../db').db().collection('follows');
const ObjectID = require('mongodb').ObjectID;
const User = require('./userModel');
const sanitizeHTML = require('sanitize-html');

let Bid = function (data, userid, requestedBidId) {
  this.data = data;
  this.errors = [];
  this.userid = userid;
  this.requestedBidId = requestedBidId;
};

Bid.prototype.cleanUp = function () {
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

Bid.prototype.validate = function () {
  if (this.data.title == '') {
    this.errors.push('You must provide a title.');
  }
  if (this.data.description == '') {
    this.errors.push('You must provide bid content.');
  }
};

Bid.prototype.create = function () {
  return new Promise((resolve, reject) => {
    this.cleanUp();
    this.validate();
    if (!this.errors.length) {
      // save bid into database
      bidsCollection
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

Bid.prototype.update = function () {
  return new Promise(async (resolve, reject) => {
    try {
      let bid = await Bid.findSingleById(this.requestedBidId, this.userid);
      if (bid.isVisitorOwner) {
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

Bid.prototype.actuallyUpdate = function () {
  return new Promise(async (resolve, reject) => {
    this.cleanUp();
    this.validate();
    if (!this.errors.length) {
      await bidsCollection.findOneAndUpdate({ _id: new ObjectID(this.requestedBidId) }, { $set: { title: this.data.title, description: this.data.description } });
      resolve('success');
    } else {
      resolve('failure');
    }
  });
};

Bid.reusableBidQuery = function (uniqueOperations, visitorId) {
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

    let bids = await bidsCollection.aggregate(aggOperations).toArray();

    // clean up author property in each bid object
    bids = bids.map(function (bid) {
      bid.isVisitorOwner = bid.authorId.equals(visitorId);
      bid.authorId = undefined;

      bid.author = {
        username: bid.author.username,
        firstName: bid.author.firstName,
        lastName: bid.author.lastName,
        avatar: new User(bid.author, true).avatar,
      };

      return bid;
    });

    resolve(bids);
  });
};

Bid.findSingleById = function (id, visitorId) {
  return new Promise(async function (resolve, reject) {
    if (typeof id != 'string' || !ObjectID.isValid(id)) {
      reject();
      return;
    }

    let bids = await Bid.reusableBidQuery([{ $match: { _id: new ObjectID(id) } }], visitorId);

    if (bids.length) {
      resolve(bids[0]);
    } else {
      reject();
    }
  });
};

Bid.findByAuthorId = function (authorId) {
  return Bid.reusableBidQuery([{ $match: { author: authorId } }, { $sort: { createdDate: -1 } }]);
};

Bid.delete = function (bidIdToDelete, currentUserId) {
  return new Promise(async (resolve, reject) => {
    try {
      let bid = await Bid.findSingleById(bidIdToDelete, currentUserId);
      if (bid.isVisitorOwner) {
        await bidsCollection.deleteOne({ _id: new ObjectID(bidIdToDelete) });
        resolve();
      } else {
        reject();
      }
    } catch {
      reject();
    }
  });
};

Bid.search = function (searchTerm) {
  return new Promise(async (resolve, reject) => {
    if (typeof searchTerm == 'string') {
      let bids = await Bid.reusableBidQuery([{ $match: { $text: { $search: searchTerm } } }, { $sort: { score: { $meta: 'textScore' } } }]);
      resolve(bids);
    } else {
      reject();
    }
  });
};

Bid.countBidsByAuthor = function (id) {
  return new Promise(async (resolve, reject) => {
    let bidCount = await bidsCollection.countDocuments({ author: id });
    resolve(bidCount);
  });
};

Bid.getFeed = async function (id) {
  // create an array of the user ids that the current user follows
  let followedUsers = await followsCollection.find({ authorId: new ObjectID(id) }).toArray();
  followedUsers = followedUsers.map(function (followDoc) {
    return followDoc.followedId;
  });

  // look for bids where the author is in the above array of followed users
  return Bid.reusableBidQuery([{ $match: { author: { $in: followedUsers } } }, { $sort: { createdDate: -1 } }]);
};

module.exports = Bid;
