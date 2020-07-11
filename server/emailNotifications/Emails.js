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
    from: '"My Nigerian Projects" <thebiddingapp@gmail.com>',
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
    from: '"My Nigerian Projects" <thebiddingapp@gmail.com>',
    to: email,
    subject: `${firstName}, Reset Your Password | My Nigerian Projects`,
    html: `${emailHeader}
                    <table style='min-width:100%' cellspacing="0" cellpadding="0" bgcolor='#ffffff'>
                        <tbody>
                          <tr>
                          <td style='font-family:Helvetica,Geneva,Tahoma,Verdana,sans-serif;padding:0px 30px 45px' align='left'>
                              Hello ${firstName}, <br/><br/>
                              Please click on the following link to complete the process:
                              <a href='${url}/reset-password/${token}'>Reset your password</a><br>
                            </td>
                          </tr>
                          <tr>
                            <td style='font-family:Helvetica,Geneva,Tahoma,Verdana,sans-serif;padding:0px 30px 45px' align='left'>
                              Paste the below URL into your browser to complete the process: <br/>
                              ${url}/reset-password/${token} <br/><br/> 
                              If you did not request this, please ignore this email and your password will remain unchanged.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                ${emailFooter}`,
  };
  transporter.sendMail(data, (err, info) => {
    if (err) console.log(err);
    else console.log('Reset Password Token Sent Via Email: ' + info.response);
  });
};

Email.prototype.projectSuccessfullyCreated = projectData => {
  const data = {
    from: '"My Nigerian Projects" <thebiddingapp@gmail.com>',
    to: projectData.email,
    subject: `Congrats, Your New Project - ${projectData.title} is Live! | My Nigerian Projects`,
    html: `${emailHeader}
                      <table style='min-width:100%' cellspacing="0" cellpadding="0" bgcolor='#ffffff'>
                        <tbody>
                          <tr>
                            <td style='padding:32px 30px 45px'>
                              <h1 style='font-family:Helvetica,Geneva,Tahoma,Verdana,sans-serif;text-decoration:none;color:#464646;font-weight:bold'>${projectData.title}</h1>
                              <div style='overflowWrap:anywhere;minWidth:0px;font-family:Helvetica,Geneva,Tahoma,Verdana,sans-serif;line-height:28px;color:#555555;padding-top:0px;overflow-wrap: break-word; min-width: 0px;'>${projectData.description}</div>
                            </td>
                          </tr>
                          <tr>
                            <td style='font-family:Helvetica,Geneva,Tahoma,Verdana,sans-serif;padding:0px 30px 45px' align='left'>
                              <a href='https://mynigerianprojects.com/project/${projectData._id}' style='background:#0060df;color:#fff;text-decoration:none;border:14px solid #0060df;border-left-width:50px;border-right-width:50px;display:inline-block' target='_blank'>
                                View on My Nigerian Projects
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                ${emailFooter}
          `,
  };
  transporter.sendMail(data, (err, info) => {
    if (err) console.log(err);
    else console.log('Project Creation Success Sent Via Email: ' + info.response);
  });
};

Email.prototype.sendEmailToOwnerOfProjectAboutNewBid = (projectId, projectTitle, projectEmail, bidId) => {
  const data = {
    from: '"My Nigerian Projects" <thebiddingapp@gmail.com>',
    to: projectEmail,
    subject: `You Got a New Bid on Your - ${projectTitle} Project | My Nigerian Projects`,
    html: `${emailHeader}
                      <table style='min-width:100%' cellspacing="0" cellpadding="0" bgcolor='#ffffff'>
                        <tbody>
                          <tr>
                            <td style='padding:32px 30px 45px'>
                              <h1 style='font-family:Helvetica,Geneva,Tahoma,Verdana,sans-serif;text-decoration:none;color:#464646;font-weight:bold'>${projectData.title}</h1>
                              <div style='overflowWrap:anywhere;minWidth:0px;font-family:Helvetica,Geneva,Tahoma,Verdana,sans-serif;line-height:28px;color:#555555;padding-top:0px;overflow-wrap: break-word; min-width: 0px;'>${projectData.description}</div>
                            </td>
                          </tr>
                          <tr>
                            <td style='font-family:Helvetica,Geneva,Tahoma,Verdana,sans-serif;padding:0px 30px 45px' align='left'>
                              <a href='https://mynigerianprojects.com/project/${projectData._id}' style='background:#0060df;color:#fff;text-decoration:none;border:14px solid #0060df;border-left-width:50px;border-right-width:50px;display:inline-block' target='_blank'>
                                View on My Nigerian Projects
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                ${emailFooter}
          `,
  };
  transporter.sendMail(data, (err, info) => {
    if (err) console.log(err);
    else console.log('Bid Creation Success Sent Via Email: ' + info.response);
  });
};

Email.prototype.emailAllUsersAboutNewProject = (projectData, allOtherEmails) => {
  // SEND EMAIL TO EACH USER
  for (let i = 0; i < allOtherEmails.length; i++) {
    const email = allOtherEmails[i];

    if (projectData.email != email) {
      const data = {
        from: '"My Nigerian Projects" <thebiddingapp@gmail.com>',
        to: email,
        subject: `New Project Posted | My Nigerian Projects`,
        html: `${emailHeader}
                      <table style='min-width:100%' cellspacing="0" cellpadding="0" bgcolor='#ffffff'>
                        <tbody>
                          <tr>
                            <td style='padding:32px 30px 45px'>
                              <h1 style='font-family:Helvetica,Geneva,Tahoma,Verdana,sans-serif;text-decoration:none;color:#464646;font-weight:bold'>${projectData.title}</h1>
                              <div style='overflowWrap:anywhere;minWidth:0px;font-family:Helvetica,Geneva,Tahoma,Verdana,sans-serif;line-height:28px;color:#555555;padding-top:0px;overflow-wrap: break-word; min-width: 0px;'>${projectData.description}</div>
                            </td>
                          </tr>
                          <tr>
                            <td style='font-family:Helvetica,Geneva,Tahoma,Verdana,sans-serif;padding:0px 30px 45px' align='left'>
                              <a href='https://mynigerianprojects.com/project/${projectData._id}' style='background:#0060df;color:#fff;text-decoration:none;border:14px solid #0060df;border-left-width:50px;border-right-width:50px;display:inline-block' target='_blank'>
                                View on My Nigerian Projects
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                ${emailFooter}
          `,
      };
      transporter.sendMail(data, (err, info) => {
        if (err) console.log(err);
        else console.log(`Sent Email to Others: Email #${i + 1} to ${email}: ` + info.response);
      });
    }
  }
};

Email.prototype.registrationSuccess = userData => {
  const data = {
    from: '"My Nigerian Projects" <thebiddingapp@gmail.com>',
    to: userData.email,
    subject: `Congratulations ${userData.firstName}, Registration Success | My Nigerian Projects`,
    html: `${emailHeader}
                      <table style='min-width:100%' cellspacing="0" cellpadding="0" bgcolor='#ffffff'>
                        <tbody>
                          <tr>
                            <td style='padding:32px 30px 45px'>
                              <h1 style='font-family:Helvetica,Geneva,Tahoma,Verdana,sans-serif;text-decoration:none;color:#464646;font-weight:bold'>
                              Hello <strong>${userData.firstName},</strong><br/>
                              </h1>
                              You have successfully created an account with My Nigerian Projects.<br>
                              Checkout your profile:
                            </td>
                          </tr>
                          <tr>
                            <td style='font-family:Helvetica,Geneva,Tahoma,Verdana,sans-serif;padding:0px 30px 45px' align='left'>
                              <a href='https://mynigerianprojects.com/profile/${userData.username}' style='background:#0060df;color:#fff;text-decoration:none;border:14px solid #0060df;border-left-width:50px;border-right-width:50px;display:inline-block' target='_blank'>
                                View on My Nigerian Projects
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                ${emailFooter}
          `,
  };
  transporter.sendMail(data, (err, info) => {
    if (err) console.log(err);
    else console.log('Registration Success Sent Via Email: ' + info.response);
  });
};

Email.prototype.changePasswordSuccess = userData => {
  const data = {
    from: '"My Nigerian Projects" <thebiddingapp@gmail.com>',
    to: userData.email,
    subject: `${userData.firstName}, You Have Successfully Changed Your Password | My Nigerian Projects`,
    html: `${emailHeader}
                      <table style='min-width:100%' cellspacing="0" cellpadding="0" bgcolor='#ffffff'>
                        <tbody>
                          <tr>
                            <td style='padding:32px 30px 45px'>
                              <h1 style='font-family:Helvetica,Geneva,Tahoma,Verdana,sans-serif;text-decoration:none;color:#464646;font-weight:bold'>
                              Hello <strong>${userData.firstName},</strong><br/>
                              </h1>
                              You have successfully changed your password.
                            </td>
                          </tr>
                          <tr>
                            <td style='font-family:Helvetica,Geneva,Tahoma,Verdana,sans-serif;padding:0px 30px 45px' align='left'>
                               If you did not changed your password, secure your account by resetting your password:
                            </td>
                            <tr>
                              <td style='font-family:Helvetica,Geneva,Tahoma,Verdana,sans-serif;padding:0px 30px 45px' align='left'>
                                <a href='https://mynigerianprojects.com/reset-password' style='background:#0060df;color:#fff;text-decoration:none;border:14px solid #0060df;border-left-width:50px;border-right-width:50px;display:inline-block' target='_blank'>
                                 Secure My Account Now
                                </a>
                              </td>
                            </tr>
                          </tr>
                        </tbody>
                      </table>
                ${emailFooter}
          `,
  };
  transporter.sendMail(data, (err, info) => {
    if (err) console.log(err);
    else console.log('Change Password Success Sent Via Email: ' + info.response);
  });
};

Email.prototype.deleteAccountSuccess = userData => {
  const data = {
    from: '"My Nigerian Projects" <thebiddingapp@gmail.com>',
    to: userData.email,
    subject: `${userData.firstName}, You Have Successfully Deleted Your Account | My Nigerian Projects`,
    html: `${emailHeader}
                      <table style='min-width:100%' cellspacing="0" cellpadding="0" bgcolor='#ffffff'>
                        <tbody>
                          <tr>
                            <td style='padding:32px 30px 45px'>
                              <h1 style='font-family:Helvetica,Geneva,Tahoma,Verdana,sans-serif;text-decoration:none;color:#464646;font-weight:bold'>
                              Hello <strong>${userData.firstName},</strong><br/>
                              </h1>
                              So sorry to see you go but you have successfully deleted your account.
                            </td>
                          </tr>
                          <tr>
                            <td style='font-family:Helvetica,Geneva,Tahoma,Verdana,sans-serif;padding:0px 30px 45px' align='left'>
                               If you change your mind, please create an account and help me and others fullfil our projects in Nigeria and earn some money too:
                            </td>
                            <tr>
                              <td style='font-family:Helvetica,Geneva,Tahoma,Verdana,sans-serif;padding:0px 30px 45px' align='left'>
                                <a href='https://mynigerianprojects.com/register' style='background:#0060df;color:#fff;text-decoration:none;border:14px solid #0060df;border-left-width:50px;border-right-width:50px;display:inline-block' target='_blank'>
                                 Create Account
                                </a>
                              </td>
                            </tr>
                          </tr>
                        </tbody>
                      </table>
                ${emailFooter}
          `,
  };
  transporter.sendMail(data, (err, info) => {
    if (err) console.log(err);
    else console.log('Delete Account Success Sent Via Email: ' + info.response);
  });
};

Email.prototype.youHaveNewFollower = (userData, profileUsername) => {
  /**
   * @userData {
      //   profileName: '',
      //   profileEmail: '',
      //   followerName: ''
      // }
   */

  const data = {
    from: '"My Nigerian Projects" <thebiddingapp@gmail.com>',
    to: userData.profileEmail,
    subject: `${userData.profileName}, You Have a New Follower | My Nigerian Projects`,
    html: `${emailHeader}
            <table style='min-width:100%' cellspacing="0" cellpadding="0" bgcolor='#ffffff'>
              <tbody>
                <tr>
                  <td style='padding:32px 30px 45px'>
                    <h1 style='font-family:Helvetica,Geneva,Tahoma,Verdana,sans-serif;text-decoration:none;color:#464646;font-weight:bold'>
                    Hello <strong>${userData.profileName},</strong><br/>
                    </h1>
                    ${userData.followerName}, just followed you. 
                  </td>
                </tr>
                <tr>
                  <td style='font-family:Helvetica,Geneva,Tahoma,Verdana,sans-serif;padding:0px 30px 45px' align='left'>
                      Go to your profile and manage your followers:
                  </td>
                  <tr>
                    <td style='font-family:Helvetica,Geneva,Tahoma,Verdana,sans-serif;padding:0px 30px 45px' align='left'>
                      <a href='https://mynigerianprojects.com/profile/${profileUsername}' style='background:#0060df;color:#fff;text-decoration:none;border:14px solid #0060df;border-left-width:50px;border-right-width:50px;display:inline-block' target='_blank'>
                        View My Profile
                      </a>
                    </td>
                  </tr>
                </tr>
              </tbody>
            </table>
      ${emailFooter}
          `,
  };
  transporter.sendMail(data, (err, info) => {
    if (err) console.log(err);
    else console.log('Follow Success Sent Via Email: ' + info.response);
  });
};

// SOME VARIABLES

const emailHeader = `<div style='background:#ffffff;font-family:Arial,Helvetica,sans-serif;'>
  <table align='center' style='padding:0 10px; width: 640px; background:#ffffff' cellspacing='0' cellpadding='0' border='0'>
    <tbody>
         <tr>
              <td width='640' style='font-size:15px;'>
              <table style='background-color:transparent; width='640' cellspacing='0' cellpadding='0'>
                <tbody>
                  <tr>
                    <td style='padding:11px'>
                      <table width='100%' cellspacing='0' cellpadding='0'>
                        <tbody>
                          <tr>
                            <td align='center'>
                              <a href='https://mynigerianprojects.com' target='_blank'>
                                <img src='https://i.ibb.co/8Y5hL2d/bgg.jpg' alt='background' style='display:block; position: relative; padding:0px;text-align:center;height:20%;width:100%' min-width='650' />
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td>
                  `;

const emailFooter = `</td>
            </tr>
                <tr>
                    <td width='640' align='center' style='background-color:#000000'>
                      <table cellspacing='0' cellpadding='0'>
                        <tbody>
                          <tr>
                            <td align='center' style='font-size: 12px;font-family:Helvetica,Geneva,Tahoma,Verdana,sans-serif;color:#ffffff;padding:10px'>
                                 You're receiving this email because you are a member of My Nigerian Projects. If you prefer not to be included
                                 in future emails please reach out to me at thebiddingapp@gmail.com.
                              <br />
                              <br />
                                 <a href='https://mynigerianprojects.com/register' style='color:#ffffff;font-weight:bold' target='_blank'>
                                Join My Nigerian Projects
                              </a>
                              &nbsp;&nbsp;|&nbsp;&nbsp;
                              <a href='https://mynigerianprojects.com/login' style='color:#ffffff;font-weight:bold' target='_blank'>
                                Login
                              </a>
                              <br />
                              <br />
                              PO Box 511, Charles City, Iowa 50616
                              <br />
                              <a href='https://mynigerianprojects.com/terms' style='color:#ffffff' target='_blank'>
                                Terms
                              </a>
                              •
                              <a href='https://mynigerianprojects.com/privacy' style='color:#ffffff' target='_blank'>
                                Privacy
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
            </tbody>
          </table>
        </div>
                  `;

// EXPORT CODE
module.exports = Email;
