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
    html: `Hello ${firstName},` + '<br><br>' + 'Please click on the following link to complete the process:\n' + '<a href="' + url + '/reset-password/' + token + '">Reset your password</a><br>' + 'OR' + '<br>' + 'Paste the below URL into your browser to complete the process:' + '<br>' + url + '/reset-password/' + token + '<br><br>' + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
  };
  transporter.sendMail(data, (err, info) => {
    if (err) console.log(err);
    else console.log('Reset Password Token Sent Via Email: ' + info.response);
  });
};

Email.prototype.projectSuccessfullyCreated = projectData => {
  const data = {
    from: '"The Bidding App" <thebiddingapp@gmail.com>',
    to: projectData.email,
    subject: `Your project, ${projectData.title}, was created - The Bidding App`,
    html: `<div style="background:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:1em">
    <table width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#ffffff">
       <tbody>
          <tr>
             <td align="center" valign="top" style="background:#ffffff" width="100%">
                <table cellpadding="0" cellspacing="0">
                   <tbody>
                      <tr>
                         <td width="640">
                            <table style="background-color:transparent;min-width:100%" width="100%" cellspacing="0" cellpadding="0">
                               <tbody>
                                  <tr>
                                     <td style="padding:11px">
                                        <table width="100%" cellspacing="0" cellpadding="0">
                                           <tbody>
                                              <tr>
                                                 <td align="center">
                                                    <a href="https://bidding.netlify.app" target="_blank">
                                                    <img src="https://i.ibb.co/8Y5hL2d/bgg.jpg" alt="background" style="display:block; position: relative; padding:0px;text-align:center;height:30%;width:100%" width="650">
                                                    </a>
                                                 </td>
                                              </tr>
                                           </tbody>
                                        </table>
                                     </td>
                                  </tr>
                               </tbody>
                            </table>
                         </td>
                      </tr>
                      <tr>
                         <td width="640" align="center" style="padding:0 10px">
                            <table style="min-width:100%" width="100%" cellspacing="0" cellpadding="0">
                               <tbody>
                                  <tr>
                                     <td>
                                        <table cellspacing="0" cellpadding="0" bgcolor="#ffffff">
                                           <tbody>
                                              <tr>
                                                 <td style="padding:32px 30px 45px">
                                                    <h1 style="font-family:Helvetica,Geneva,Tahoma,Verdana,sans-serif;text-decoration:none;color:#464646;line-height:10px;font-size:22px;font-weight:bold">
                                                       ${projectData.title}
                                                    </h1>
                                                    <span style="font-family:Helvetica,Geneva,Tahoma,Verdana,sans-serif;font-size:16px;line-height:28px;color:#555555;padding-top:0px">
                                                    ${projectData.description}
                                                    </span>
                                                 </td>
                                              </tr>
                                              <tr>
                                                 <td style="font-family:Helvetica,Geneva,Tahoma,Verdana,sans-serif;font-size:16px;padding:0px 30px 45px" align="left">
                                                    <a href="https://bidding.netlify.app/project/${projectData._id}" style="background:#0060df;color:#fff;text-decoration:none;border:14px solid #0060df;border-left-width:50px;border-right-width:50px;display:inline-block" target="_blank">
                                                    View on the Bidding App
                                                    </a>  
                                                 </td>
                                              </tr>
                                           </tbody>
                                        </table>
                                        <br>
                                        <table cellspacing="0" cellpadding="0">
                                           <tbody>
                                              <tr>
                                                 <td width="640" align="center" style="padding-top:10px;background-color:#000000">
                                                    <table cellspacing="0" cellpadding="0">
                                                       <tbody>
                                                          <tr>
                                                             <td align="center" style="font-family:Helvetica,Geneva,Tahoma,Verdana,sans-serif;font-size:14px;line-height:18px;color:#ffffff;padding:0 20px 40px">
                                                                <br><br>You're receiving this email because you are a member of the Bidding App.<br><br>
                                                                <br>
                                                                <a href="https://bidding.netlify.app/register" style="color:#ffffff;font-weight:bold" target="_blank">Join The Bidding App</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="https://bidding.netlify.app/login" style="color:#ffffff;font-weight:bold" target="_blank">Login</a>
                                                                <br>
                                                                PO Box 511, Charles City, Iowa 50616
                                                                <br>
                                                                <a href="https://bidding.netlify.app/terms" style="color:#ffffff" target="_blank">Terms</a> • 
                                                                <a href="https://bidding.netlify.app/privacy" style="color:#ffffff" target="_blank">Privacy</a>
                                                             </td>
                                                          </tr>
                                                       </tbody>
                                                    </table>
                                                 </td>
                                              </tr>
                                           </tbody>
                                        </table>
                                     </td>
                                  </tr>
                               </tbody>
                            </table>
                         </td>
                      </tr>
                   </tbody>
                </table>
             </td>
          </tr>
       </tbody>
    </table>
    </td></tr></tbody></table>
 </div>`,
  };
  transporter.sendMail(data, (err, info) => {
    if (err) console.log(err);
    else console.log('Project Creation Success Sent Via Email: ' + info.response);
  });
};

// EXPORT CODE
module.exports = Email;
