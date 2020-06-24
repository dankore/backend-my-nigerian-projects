const nodemailer = require('nodemailer');
require('dotenv').config();

let Email = class email {
  constructor(from, to, subject, html) {
    this.from = from;
    this.to = to;
    this.subject = subject;
    this.html = html;
  }
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'thebiddingapp@gmail.com',
    pass: process.env.GMAILPW,
  },
});

Email.prototype.sendResetPasswordToken = (email, firstName, url, token) => {
  const data = {
    to: email,
    from: '"The Bidding App" <thebiddingapp@gmail.com>',
    subject: `${firstName}, Reset Your Password - The Bidding App`,
    html: `Hello ${firstName},` + '<br><br>' + 'Please click on the following link to complete the process:\n' + '<a href="https://' + url + '/reset-password/' + token + '">Reset your password</a><br>' + 'OR' + '<br>' + 'Paste the below URL into your browser to complete the process:' + '<br>' + 'https://' + url + '/reset-password/' + token + '<br><br>' + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
  };
  transporter.sendMail(data, (err, info) => {
    if (err) console.log(err);
    else console.log('Reset Password Token Sent Via Email: ' + info.response);
  });
};

transporter.verify((error, success) => {
  if (error) console.log(error);
  else console.log('Server is ready to take email messages');
});
Email.prototype.whoLoggedIn = attemptedUserFirstName => {
  const data = {
    from: '"The Bidding App" <thebiddingapp@gmail.com>',
    to: 'adamu.dankore@gmail.com',
    subject: `Login from ${attemptedUserFirstName}`,
  };
  transporter.sendMail(data, (error, info) => {
    if (error) console.log(error);
    else console.log('Who Logs in Email Sent: ' + info.response);
  });
};

Email.prototype.sendResetPasswordToken = (email, firstName, url, token) => {
  const data = {
    from: '"The Bidding App" <thebiddingapp@gmail.com>',
    to: email,
    subject: `${firstName}, Reset Your Password - The Bidding App`,
    html: `Hello ${firstName},` + '<br><br>' + 'Please click on the following link to complete the process:\n' + '<a href="https://' + url + '/reset-password/' + token + '">Reset your password</a><br>' + 'OR' + '<br>' + 'Paste the below URL into your browser to complete the process:' + '<br>' + 'https://' + url + '/reset-password/' + token + '<br><br>' + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
  };
  transporter.sendMail(data, (err, info) => {
    if (err) console.log(err);
    else console.log('Reset Password Token Sent Via Email: ' + info.response);
  });
};
module.exports = Email;
