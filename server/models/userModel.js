const usersCollection = require('../../db').db().collection('users');
const followsCollection = require('../../db').db().collection('follows');
const projectsCollection = require('../../db').db().collection('projects');
const ObjectID = require('mongodb').ObjectID;
const validator = require('validator');
const bcrypt = require('bcryptjs');
const md5 = require('md5');
const Email = require('../emailNotifications/Emails');
const crypto = require('crypto');
const { response } = require('express');

let User = class user {
  constructor (data, getAvatar) {
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
    username: this.data.username.trim().toLowerCase(),
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
  if (/[^a-zA-Z]/.test(this.data.firstName.trim())) {
    this.errors.push('First name can only be letters.');
  }
  if (this.data.lastName == '') {
    this.errors.push('You must provide a last name.');
  }
  if (/[^a-zA-Z]/.test(this.data.lastName.trim())) {
    this.errors.push('Last name can only be letters.');
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
      let usernameExists = await usersCollection.findOne({
        username: this.data.username,
      });
      if (usernameExists) {
        this.errors.push('That username is already taken.');
      }
    }

    // Only if email is valid then check to see if it's already taken
    if (validator.isEmail(this.data.email)) {
      let emailExists = await usersCollection.findOne({
        email: this.data.email,
      });
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

      // SEND EMAIL
      new Email().registrationSuccess(this.data);

      // EMAIL ME NEW REGISTRATION
      new Email().gulma(this.data.firstName, 'reg');
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
          // GET EITHER THE UPLOADED AVATAR OR THEIR GRAVATAR
          let avatar;
          if (userDoc.data.avatar) {
            avatar = userDoc.data.avatar;
          } else {
            avatar = userDoc.avatar;
          }

          userDoc = {
            _id: userDoc.data._id,
            username: userDoc.data.username,
            firstName: userDoc.data.firstName,
            lastName: userDoc.data.lastName,
            email: userDoc.data.email,
            avatar: avatar,
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
          // GET UPLOADED PROFILE PIC OR GRAVATAR
          if (attemptedUser.avatar) {
            this.data = attemptedUser;
          } else {
            this.data = attemptedUser;
            this.data.avatar = new User(attemptedUser, true).avatar;
          }

          resolve();
          // EMAIL ME WHO LOGS IN
          new Email().gulma(this.data.firstName, 'login');
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
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    } else {
      return reject(this.errors);
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
          new Email().changePasswordSuccess(userDoc);
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

      // CHECK TO SEE IF USER UPLOADED A CUSTOM PROFILE PICTURE
      if (!userDoc.avatar) {
        userDoc.avatar = `https://gravatar.com/avatar/${md5(userDoc.email)}?s=128`;
      }

      resolve(userDoc);
    } catch (error) {
      reject(error);
    }
  });
};

User.deleteAccount = (userId, userData) => {
  return new Promise(async (resolve, reject) => {
    usersCollection
      .findOneAndDelete(
        { _id: new ObjectID(userId) },
        {
          projection: {
            _id: 0,
            email: 1,
            firstName: 1,
            lastName: 1,
          },
        }
      )
      .then(async info => {
        resolve('Success');
        await followsCollection.deleteMany({
          $or: [{ followedId: new ObjectID(userId) }, { authorId: new ObjectID(userId) }],
        });
        await projectsCollection.deleteMany({ author: new ObjectID(userId) });
        new Email().deleteAccountSuccess(info.value);
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
      if (user) resolve('Success');
      else reject('Password reset token is invalid or has expired. Please generate another token below.');
    } catch (error) {
      reject(error);
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
  if (typeof this.data.token != 'string') {
    this.data.token = '';
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
  if (this.data.token == '') {
    this.errors.push('Token is not provided by your browser.');
  }

  // REMOVE BOGUS PROPERTIES
  this.data = {
    reEnteredPassword: this.data.reEnteredPassword,
    token: this.data.token,
  };
};

User.prototype.saveNewPassword = function () {
  return new Promise(async (resolve, reject) => {
    this.passwordResetValidation();

    if (!this.errors.length) {
      const response = await User.verifyPasswordResetToken(this.data.token);
      if (response != 'Success') {
        reject('Password reset token is invalid or has expired. Please generate another token below.');
        return;
      } else {
        // HASH PASSWORD
        const salt = bcrypt.genSaltSync();
        this.data.reEnteredPassword = bcrypt.hashSync(this.data.reEnteredPassword, salt);

        // REPLACE NEW PASSWORD WITH OLD
        const status = await this.replaceOldPasswordWithNew();
        resolve(status);
      }
    } else {
      reject(this.errors);
    }
  });
};

User.prototype.replaceOldPasswordWithNew = function () {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await usersCollection.findOneAndUpdate(
        { resetPasswordToken: this.data.token },
        {
          $set: {
            password: this.data.reEnteredPassword,
            resetPasswordToken: null,
            resetPasswordExpires: null,
          },
        },
        {
          projection: {
            _id: 0,
            firstName: 1,
            lastName: 1,
            email: 1,
          },
          returnOriginal: false,
        }
      );

      resolve('Success');

      new Email().sendResetPasswordSuccess(user.value);
    } catch (error) {
      reject(error);
    }
  });
};

User.ChangeAvatar = data => {
  return new Promise(async (resolve, reject) => {
    if (data.avatar == '') {
      reject('Please upload an image.');
      return;
    }

    await usersCollection
      .findOneAndUpdate(
        { _id: new ObjectID(data.userId) },
        {
          $set: {
            avatar: data.avatar,
          },
        }
      )
      .then(response => {
        resolve('Success');
      })
      .catch(error => {
        console.log({ error });
      });
  });
};

User.recoverUsername = (email) => {
  return new Promise(async (resolve, reject) => {
    // CHECK EMAIL
    if (!validator.isEmail(email)) {
      reject('Please provide a valid email.');
      return;
    }
    // CHECK IF EMAIL EXIST IN DB
    let userDoc = await usersCollection.findOne({ email: email });
    if (!userDoc) {
      reject('No account with that email address exists.');
      return;
    }

    usersCollection.findOne(
      { email: email },
      {
        projection: {
          _id: 0,
          username: 1,
          firstName: 1,
          email: 1,
        }
      }
    ).then(response => {
      resolve('Success');
      new Email().sendUsernameAfterUsernameRecovery(response);
    })
      .catch(error => {
        reject(error)
      })
  })
}

module.exports = User;
