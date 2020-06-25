const usersCollection = require('../../db').db().collection('users');
const followsCollection = require('../../db').db().collection('follows');
const projectsCollection = require('../../db').db().collection('projects');
const ObjectID = require('mongodb').ObjectID;
const validator = require('validator');
const bcrypt = require('bcryptjs');
const md5 = require('md5');
const Email = require('../emailNotifications/Emails');
const crypto = require('crypto');

let User = class user {
  constructor(data, getAvatar) {
    this.data = data;
    this.errors = [];
    if (getAvatar == undefined) {
      getAvatar = false;
    }
    if (getAvatar) {
      this.getAvatar();
    }
  }
};

User.prototype.cleanUpForNotRegisterApi = function () {
  if (typeof this.data.username != 'string') {
    this.data.username = '';
  }

  if (typeof this.data.password != 'string') {
    this.data.password = '';
  }

  if (typeof this.data.firstName != 'string') {
    this.data.firstName = '';
  }

  if (typeof this.data.lastName != 'string') {
    this.data.firstName = '';
  }

  // get rid of any bogus properties
  this.data = {
    _id: this.data._id,
    username: this.data.username.trim(),
    firstName: this.data.firstName.trim(),
    lastName: this.data.lastName.trim(),
    password: this.data.password,
  };
};

User.prototype.cleanUpForLogin = function () {
  if (typeof this.data.username != 'string') {
    this.data.username = '';
  }

  if (typeof this.data.password != 'string') {
    this.data.password = '';
  }

  // get rid of any bogus properties
  this.data = {
    username: this.data.username.trim(),
    password: this.data.password,
  };
};

User.prototype.cleanUp = function () {
  if (typeof this.data.username != 'string') {
    this.data.username = '';
  }
  if (typeof this.data.email != 'string') {
    this.data.email = '';
  }
  if (typeof this.data.firstName != 'string') {
    this.data.firstName = '';
  }
  if (typeof this.data.lastName != 'string') {
    this.data.firstName = '';
  }
  if (typeof this.data.password != 'string') {
    this.data.password = '';
  }

  // get rid of any bogus properties
  this.data = {
    username: this.data.username.trim().toLowerCase(),
    firstName: this.data.firstName.trim(),
    lastName: this.data.lastName.trim(),
    email: this.data.email.trim().toLowerCase(),
    password: this.data.password,
  };
};

User.prototype.validateEditProfile = function () {
  if (this.data.username == '') {
    this.errors.push('You must provide a username.');
  }
  if (this.data.username != '' && !validator.isAlphanumeric(this.data.username)) {
    this.errors.push('Username can only contain letters and numbers.');
  }
  if (this.data.firstName == '') {
    this.errors.push('You must provide a first name.');
  }
  if (this.data.lastName == '') {
    this.errors.push('You must provide a last name.');
  }
};

User.prototype.validate = function () {
  return new Promise(async (resolve, reject) => {
    if (this.data.username == '') {
      this.errors.push('You must provide a username.');
    }
    if (this.data.username != '' && !validator.isAlphanumeric(this.data.username)) {
      this.errors.push('Username can only contain letters and numbers.');
    }
    if (this.data.firstName == '') {
      this.errors.push('You must provide a first name.');
    }
    if (this.data.lastName == '') {
      this.errors.push('You must provide a last name.');
    }
    if (!validator.isEmail(this.data.email)) {
      this.errors.push('You must provide a valid email address.');
    }
    if (this.data.password == '') {
      this.errors.push('You must provide a password.');
    }
    if (this.data.password.length > 0 && this.data.password.length < 6) {
      this.errors.push('Password must be at least 6 characters.');
    }
    if (this.data.password.length > 50) {
      this.errors.push('Password cannot exceed 50 characters.');
    }
    if (this.data.username.length > 0 && this.data.username.length < 3) {
      this.errors.push('Username must be at least 3 characters.');
    }
    if (this.data.username.length > 30) {
      this.errors.push('Username cannot exceed 30 characters.');
    }

    // Only if username is valid then check to see if it's already taken
    if (this.data.username.length > 2 && this.data.username.length < 31 && validator.isAlphanumeric(this.data.username)) {
      let usernameExists = await usersCollection.findOne({ username: this.data.username });
      if (usernameExists) {
        this.errors.push('That username is already taken.');
      }
    }

    // Only if email is valid then check to see if it's already taken
    if (validator.isEmail(this.data.email)) {
      let emailExists = await usersCollection.findOne({ email: this.data.email });
      if (emailExists) {
        this.errors.push('That email is already being used.');
      }
    }
    resolve();
  });
};

User.prototype.register = function () {
  return new Promise(async (resolve, reject) => {
    // CLEAN AND VALIDATE DATA
    this.cleanUp();
    await this.validate();

    if (!this.errors.length) {
      // HASH USER PASSWORD
      let salt = bcrypt.genSaltSync();
      this.data.password = bcrypt.hashSync(this.data.password, salt);

      // INSERT DATA INTO DB
      await usersCollection.insertOne(this.data);
      this.getAvatar();
      resolve('Model: User created.');
    } else {
      reject(this.errors);
    }
  });
};

User.prototype.getAvatar = function () {
  this.avatar = `https://gravatar.com/avatar/${md5(this.data.email)}?s=128`;
};

User.findByUsername = function (username) {
  return new Promise((resolve, reject) => {
    if (typeof username != 'string') {
      reject();
      return;
    }

    usersCollection
      .findOne({
        username: username,
      })
      .then(userDoc => {
        if (userDoc) {
          userDoc = new User(userDoc, true);
          userDoc = {
            _id: userDoc.data._id,
            username: userDoc.data.username,
            firstName: userDoc.data.firstName,
            lastName: userDoc.data.lastName,
            email: userDoc.data.email,
            avatar: userDoc.avatar,
          };

          resolve(userDoc);
        } else {
          reject(false);
        }
      })
      .catch(() => {
        reject('No user by username');
      });
  });
};

User.findByEmail = function (email) {
  return new Promise((resolve, reject) => {
    if (typeof email != 'string') {
      reject();
      return;
    }
    usersCollection
      .findOne({
        email: email,
      })
      .then(userDoc => {
        if (userDoc) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(() => {
        reject('No user by email');
      });
  });
};

User.prototype.login = function () {
  return new Promise((resolve, reject) => {
    this.cleanUpForLogin();

    usersCollection
      .findOne({ username: this.data.username })
      .then(attemptedUser => {
        if (attemptedUser && bcrypt.compareSync(this.data.password, attemptedUser.password)) {
          this.data = attemptedUser;
          this.getAvatar();
          resolve('Login Success!');
          console.log('hi');
          //   new Email().whoLoggedIn(this.data.firstName);
          let email = new Email();
          email.whoLoggedIn(this.data.firstName);
        } else {
          reject('Invalid username / password.');
        }
      })
      .catch(() => {
        reject('Please try again.');
      });
  });
};

User.prototype.updateProfile = function () {
  return new Promise(async (resolve, reject) => {
    this.cleanUpForNotRegisterApi();
    this.validateEditProfile();

    if (!this.errors.length) {
      usersCollection
        .findOneAndUpdate(
          { _id: new ObjectID(this.data._id) },
          {
            $set: {
              username: this.data.username,
              firstName: this.data.firstName,
              lastName: this.data.lastName,
            },
          },
          {
            projection: {
              username: 1,
              firstName: 1,
              lastName: 1,
            },
            returnOriginal: false,
          }
        )
        .then(info => {
          resolve(info.value);
          // UPDATE USER PROFILE INFO ON EVERY BID
          // User.updateProfileInfo(info.value);
        })
        .catch(() => {
          reject('Profile Update failed.');
        });
    } else {
      reject('Profile Update failed.');
    }
  });
};

User.changePassword = data => {
  return new Promise(async (resolve, reject) => {
    if (data.newPassword != data.reEnteredNewPassword) {
      reject('Passwords do not match.');
      return;
    }
    if (data.newPassword == '' || data.reEnteredNewPassword == '' || data.currentPassword == '') {
      reject('Passwords fields cannot be empty.');
      return;
    }
    if (data.newPassword.length < 6 || data.reEnteredNewPassword.length < 6) {
      reject('Passwords must be at least 6 characters.');
      return;
    }
    if (data.newPassword.length > 50 || data.reEnteredNewPassword.length > 50) {
      reject('Passwords must be less than 50 characters.');
      return;
    }

    usersCollection
      .findOne({ _id: new ObjectID(data._id) })
      .then(async userDoc => {
        if (userDoc && bcrypt.compareSync(data.currentPassword, userDoc.password)) {
          // HASH / SCRAMBLE PASSWORD
          const salt = bcrypt.genSaltSync();
          data.newPassword = bcrypt.hashSync(data.newPassword, salt);

          // SAVE NEW PASSWORD
          await usersCollection.findOneAndUpdate({ _id: new ObjectID(data._id) }, { $set: { password: data.newPassword } });
          resolve('Success');
        } else {
          resolve('New password does not match current password.');
        }
      })
      .catch(() => {
        reject('Something went wrong while changing your password. Please try again.');
      });
  });
};

User.getProfileById = id => {
  return new Promise(async (resolve, reject) => {
    try {
      const userDoc = await usersCollection.findOne(
        { _id: new ObjectID(id) },
        {
          projection: {
            password: 0,
          },
        }
      );
      userDoc.avatar = `https://gravatar.com/avatar/${md5(userDoc.email)}?s=128`;
      resolve(userDoc);
    } catch (error) {
      reject(error);
    }
  });
};

User.deleteAccount = userId => {
  return new Promise(async (resolve, reject) => {
    usersCollection
      .findOneAndDelete({ _id: new ObjectID(userId) })
      .then(async _ => {
        resolve('Success');
        await followsCollection.deleteMany({ $or: [{ followedId: new ObjectID(userId) }, { authorId: new ObjectID(userId) }] });
        await projectsCollection.deleteMany({ author: new ObjectID(userId) });
      })
      .catch(error => {
        reject(error);
      });
  });
};

User.prototype.resetPassword = function (url) {
  return new Promise(async (resolve, reject) => {
    // CHECK EMAIL
    if (!validator.isEmail(this.data.email)) {
      reject('Please provide a valid email.');
      return;
    }
    // CHECK IF EMAIL EXIST IN DB
    let userDoc = await usersCollection.findOne({ email: this.data.email });
    if (!userDoc) {
      this.errors.push('No account with that email address exists.');
    }

    if (!this.errors.length) {
      const token = await User.cryptoRandomData();
      const resetPasswordExpires = Date.now() + 3600000; // 1 HR EXPIRY
      // ADD TOKEN AND EXPIRY TO DB
      await usersCollection.findOneAndUpdate(
        { email: this.data.email },
        {
          $set: {
            resetPasswordToken: token,
            resetPasswordExpires: resetPasswordExpires,
          },
        }
      );
      // SEND ATTEMPTED USER THE TOKEN
      new Email().sendResetPasswordToken(this.data.email, userDoc.firstName, url, token);
      console.log('success');
      resolve('Success');
    } else {
      reject(this.errors);
    }
  });
};

User.cryptoRandomData = function () {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(20, (err, buffer) => {
      if (buffer) {
        var token = buffer.toString('hex');
        resolve(token);
      } else {
        reject(err);
      }
    });
  });
};

User.verifyPasswordResetToken = token => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await usersCollection.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });
      resolve('Success');
      // if (user) resolve('Success');
      // else reject('Password reset token is invalid or has expired. Please generate another token below.');
    } catch (error) {
      reject();
    }
  });
};

User.prototype.passwordResetValidation = function () {
  if (typeof this.data.password != 'string') {
    this.data.password = '';
  }
  if (typeof this.data.reEnteredPassword != 'string') {
    this.data.reEnteredPassword = '';
  }
  if (this.data.password == '' || this.data.reEnteredPassword == '') {
    this.errors.push('Password field is empty.');
  }
  if (!validator.isLength(this.data.password, { min: 6, max: 50 })) {
    this.errors.push('Password must be at least 6 characters.');
  }
  if (this.data.password != this.data.reEnteredPassword) {
    this.errors.push('Passwords do not match.');
  }

  // REMOVE BOGUS PROPERTIES
  this.data = {
    password: this.data.password,
    reEnteredPassword: this.data.reEnteredPassword,
  };
};

User.prototype.saveNewPassword = function () {
  return new Promise(async (resolve, reject) => {
    this.passwordResetValidation();
   
  });
};

module.exports = User;
