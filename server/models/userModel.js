const usersCollection = require('../../db').db().collection('users');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const md5 = require('md5');

let User = class user_ {
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
    email: this.data.email,
    password: this.data.password,
  };
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
    console.log({ errors: this.errors });

    if (!this.errors.length) {
      console.log("hi from good!")
      // HASH USER PASSWORD
      let salt = bcrypt.genSaltSync();
      this.data.password = bcrypt.hashSync(this.data.password, salt);

      // INSERT DATA INTO DB
      await usersCollection.insertOne(this.data);
      this.getAvatar();
      resolve('Model: User created.');
    } else {
      console.log('hi from no good!');
      reject(this.errors);
    }
  });
};

User.prototype.getAvatar = function () {
  this.avatar = `https://gravatar.com/avatar/${md5(this.data.email)}?s=128`;
};

module.exports = User;
