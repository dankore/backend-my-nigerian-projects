const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
dotenv.config();

let Email = class email{
    constructor(bcc, from, subject, html){
        this.bcc = bcc;
        this.from = from;
        this.subject = subject;
        this.html = html;
    }
}

Email.prototype.transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "thebiddingapp@gmail.com",
        pass: process.env.GMAILPW
    }
});

Email.prototype.whoLoggedIn = attemptedUserFirstName => {
    console.log("inside who logged in")
     console.log(process.env.GMAILPW)
  const data = {
    bcc: "adamu.dankore@gmail.com",
    from: '"The Bidding App" <thebiddingapp@gmail.com>',
    subject: `Login from ${attemptedUserFirstName}`,
    html: `<p><strong>${attemptedUserFirstName}</strong> just logged in.</p>`
  };
  console.log({data})
  Email.prototype.transporter.sendMail(data, (err, info) => {
   console.log("inside ....")
    if (err) console.log(err);
    else console.log("Who Logs in Email Sent: " + info.response);
  });
};

Email.prototype.sendResetPasswordToken = (email, firstName, url, token) =>{
    const data = {
        bcc: email,
        from: '"The Bidding App" <thebiddingapp@gmail.com>',
        subject: `${firstName}, Reset Your Password - GSS Gwarinpa Contact Book`,
        html:
        `Hello ${firstName},` +
        "<br><br>" +
        "Please click on the following link to complete the process:\n" +
        '<a href="https://' +
        url +
        "/reset-password/" +
        token +
        '">Reset your password</a><br>' +
        "OR" +
        "<br>" +
        "Paste the below URL into your browser to complete the process:" +
        "<br>" +
        "https://" +
        url +
        "/reset-password/" +
        token +
        "<br><br>" +
        "If you did not request this, please ignore this email and your password will remain unchanged.\n"
    };
    Email.prototype.transporter.sendMail(data, (err, info)=>{
        if(err) console.log(err);
        else console.log("Reset Password Token Sent Via Email: " + info.response);
    })
}
module.exports = Email;