const User = require('../models/userModel');
const Project = require('../models/projectModel');
const Follow = require('../models/followModel');
const jwt = require('jsonwebtoken');
const { ObjectID } = require('mongodb');

// TOKEN EXPIRY
const tokenLasts = '30d';

exports.apiRegister = (req, res) => {
  let user = new User(req.body);
  user
    .register()
    .then(response => {
      console.log(user.data);
      res.json({
        token: jwt.sign(
          {
            _id: user.data._id,
            username: user.data.username,
            firstName: user.data.firstName,
            lastName: user.data.lastName,
          },
          process.env.JWTSECRET,
          { expiresIn: tokenLasts }
        ),
        _id: user.data._id,
        username: user.data.username,
        firstName: user.data.firstName,
        lastName: user.data.lastName,
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
            firstName: user.data.firstName,
            lastName: user.data.lastName,
          },
          process.env.JWTSECRET,
          { expiresIn: tokenLasts }
        ),
        _id: user.data._id,
        username: user.data.username,
        firstName: user.data.firstName,
        lastName: user.data.lastName,
        avatar: user.avatar,
        userCreationDate: new Date(ObjectID(user.data._id).getTimestamp()).toISOString().substring(0, 10),
      });
    })
    .catch(() => {
      res.json(false);
    });
};

exports.ifUserExists = (req, res, next) => {
  User.findByUsername(req.params.username)
    .then(userDoc => {
      req.profileUser = userDoc;
      next();
    })
    .catch(() => {
      res.json(false);
    });
};

exports.sharedProfileData = async (req, res, next) => {
  let viewerId;
  try {
    /**
     * @var viewer STORES THE USER ENCODED IN THE TOKEN
     */
    viewer = jwt.verify(req.body.token, process.env.JWTSECRET);
    viewerId = viewer._id;
  } catch {
    viewerId = 0;
  }

  req.isFollowing = await Follow.isVisitorFollowing(req.profileUser._id, viewerId);

  let projectCountPromise = Project.countProjectsByAuthor(req.profileUser._id);
  let followerCountPromise = Follow.countFollowersById(req.profileUser._id);
  let followingCountPromise = Follow.countFollowingById(req.profileUser._id);
  let [projectCount, followerCount, followingCount] = await Promise.all([projectCountPromise, followerCountPromise, followingCountPromise]);

  req.projectCount = projectCount;
  req.followerCount = followerCount;
  req.followingCount = followingCount;

  next();
};

exports.profileBasicData = (req, res) => {
  res.json({
    profileUsername: req.profileUser.username,
    profileFirstName: req.profileUser.firstName,
    profileLastName: req.profileUser.lastName,
    email: req.profileUser.email,
    profileAvatar: req.profileUser.avatar,
    isFollowing: req.isFollowing,
    counts: { projectCount: req.projectCount, followerCount: req.followerCount, followingCount: req.followingCount },
  });
};

exports.apiGetProjectsByUsername = async (req, res) => {
  try {
    let authorDoc = await User.findByUsername(req.params.username);
    let projects = await Project.findByAuthorId(authorDoc._id);
    res.json(projects);
  } catch {
    res.status(500).send('Invalid user requested.');
  }
};

exports.profileFollowers = async (req, res) => {
  try {
    let followers = await Follow.getFollowersById(req.profileUser._id);
    res.json(followers);
  } catch {
    res.status(500).send('Invalid follower requested.');
  }
};

exports.profileFollowing = async (req, res) => {
  try {
    let following = await Follow.getFollowingById(req.profileUser._id);
    res.json(following);
  } catch {
    res.status(500).send('Invalid following requested.');
  }
};

exports.apiMustBeLoggedIn = function (req, res, next) {
  try {
    req.apiUser = jwt.verify(req.body.token, process.env.JWTSECRET);
    next();
  } catch {
    res.status(500).send('Sorry, you must provide a valid token.');
  }
};

exports.apiGetHomeFeed = async function (req, res) {
  try {
    let projects = await Project.getFeed(req.apiUser._id);
    res.json(projects);
  } catch {
    res.status(500).send('Error');
  }
};

exports.apiGetHomeFeedIfNotLoggedIn = async (req, res) => {
  try {
    let projects = await Project.getFeedWithoutLoggingIn();
    res.json(projects);
  } catch (error) {
    res.status(500).send('Error');
  }
};

exports.updateProfileInfo = (req, res) => {
  let user = new User(req.body);

  user
    .updateProfile()
    .then(response => {
      res.json({
        token: jwt.sign(
          {
            _id: user.data._id,
            username: user.data.username,
            firstName: user.data.firstName,
            lastName: user.data.lastName,
          },
          process.env.JWTSECRET,
          { expiresIn: tokenLasts }
        ),
        _id: user.data._id,
        username: user.data.username,
        firstName: user.data.firstName,
        lastName: user.data.lastName,
      });
    })
    .catch(error => {
      res.status(500).send(error);
    });
};

exports.apiChangePassword = async (req, res) => {
  User.changePassword(req.body)
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      res.json(error);
    });
};

exports.apiGetProfileById = (req, res) => {
    User.getProfileById('5ec9799fddc50c4014f3dea6')
    .then(response=>{
        res.json(response)
    })
    .catch(error => {
        res.json(error)
    })

}