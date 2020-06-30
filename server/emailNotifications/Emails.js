const nodemailer = require("nodemailer");
require("dotenv").config();

let Email = class email {
  constructor(from, to, subject, html) {
    this.from = from;
    this.to = to;
    this.subject = subject;
    this.html = html;
  }
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "thebiddingapp@gmail.com",
    pass: process.env.GMAILPW
  }
});

transporter.verify((error, success) => {
  if (error) console.log(error);
  else console.log("Server is ready to take email messages");
});
Email.prototype.whoLoggedIn = attemptedUserFirstName => {
  const data = {
    from: '"The Bidding App" <thebiddingapp@gmail.com>',
    to: "adamu.dankore@gmail.com",
    subject: `Login from ${attemptedUserFirstName}`
  };
  transporter.sendMail(data, (error, info) => {
    if (error) console.log(error);
    else console.log("Who Logs in Email Sent: " + info.response);
  });
};

Email.prototype.sendResetPasswordToken = (email, firstName, url, token) => {
  const data = {
    from: '"The Bidding App" <thebiddingapp@gmail.com>',
    to: email,
    subject: `${firstName}, Reset Your Password - The Bidding App`,
    html:
      `Hello ${firstName},` +
      "<br><br>" +
      "Please click on the following link to complete the process:\n" +
      '<a href="' +
      url +
      "/reset-password/" +
      token +
      '">Reset your password</a><br>' +
      "OR" +
      "<br>" +
      "Paste the below URL into your browser to complete the process:" +
      "<br>" +
      url +
      "/reset-password/" +
      token +
      "<br><br>" +
      "If you did not request this, please ignore this email and your password will remain unchanged.\n"
  };
  transporter.sendMail(data, (err, info) => {
    if (err) console.log(err);
    else console.log("Reset Password Token Sent Via Email: " + info.response);
  });
};

Email.prototype.projectSuccessfullyCreated = projectData => {
  console.log({ projectData });
  const data = {
    from: '"The Bidding App" <thebiddingapp@gmail.com>',
    to: projectData.email,
    subject: `Your project, ${
      projectData.title
    }, was created - The Bidding App`,
    html: `<div style="width: 320px;">
    <p>The Bidding App</p>
      <hr style="margin-bottom: 50px;">
      <div style="padding: 10px; margin-bottom: 10px; overflow-wrap: break-word; min-width: 0px; width: 300px; background-color: #F2F3F5; border-radius: 5px;">
        <p style="width: 60px; height: 60px; border-radius: 5px;" alt="profile photo"><strong>${
          projectData.title
        }</strong>
        </p>
      <p style="font-size: 15px;"><strong>${
        projectData.description
      }</strong></p>
      </div>
      <a 
      href="https://bidding.netlify.app/project/${projectData._id}" 
      style="text-decoration: none; padding: 10px; background-color: #38a169; border-radius: 5px; color: white; 
        font-size: 15px; width: 300px; text-align: center; display:inline-block;">View on GSS Gwarinpa Contact Book
      </a>
    </div>`
  };
  transporter.sendMail(data, (err, info) => {
    if (err) console.log(err);
    else
      console.log("Project Creation Success Sent Via Email: " + info.response);
  });
};

// EXPORT CODE
module.exports = Email;
