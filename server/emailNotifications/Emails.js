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
<tr>
  <td
    valign="top"
    id="m_-5334885316815523950templateHeader"
    style="background:#ffffff none no-repeat center/cover;background-color:#ffffff;background-image:none;background-repeat:no-repeat;background-position:center;background-size:cover;border-top:0;border-bottom:0;padding-top:0px;padding-bottom:0"
  >
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="border-collapse:collapse"
    >
    </table>

    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="border-collapse:collapse"
    >
      <tbody>
        <tr>
          <td valign="top"></td>
        </tr>
      </tbody>
    </table>

    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="min-width:100%;border-collapse:collapse"
    >
      <tbody>
        <tr>
          <td valign="top">
            <table
              align="left"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="min-width:100%;border-collapse:collapse"
            >
              <tbody>
                <tr>
                  <td
                    style="padding-top:9px;padding-left:18px;padding-bottom:9px;padding-right:18px"
                  >
                    <table
                      border="0"
                      cellspacing="0"
                      width="100%"
                      style="min-width:100%!important;border:10px solid #ffffff;border-collapse:collapse"
                    >
                      <tbody>
                        <tr>
                          <td
                            valign="top"
                            style="padding:18px;color:#241c15;font-family:Helvetica;font-size:16px;font-weight:normal;text-align:left;word-break:break-word;line-height:150%"
                          >
                            <h2>Hello ${firstName},</h2>
                              Please click on the following link to complete the process:
                              <a href='${url}/reset-password/${token}'>Reset your password</a><br>
                          </td>
                        </tr>
                        <tr>
                          <td
                            style="padding:18px;color:#241c15;font-family:Helvetica;font-size:16px;font-weight:normal;text-align:left;word-break:break-word;line-height:150%"
                            valign="top"
                          >
                           <p>Paste the below URL into your browser to complete the process:</p>
                              
                              ${url}/reset-password/${token} 

                            <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
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
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="min-width:100%;border-collapse:collapse;table-layout:fixed!important"
    >
      <tbody>
        <tr>
          <td style="min-width:100%;padding:9px 18px 18px">
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="min-width:100%;border-collapse:collapse"
            >
              <tbody>
                <tr>
                  <td>
                    <span></span>
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
<tr>
  <td
    valign="top"
    id="m_-5334885316815523950templateHeader"
    style="background:#ffffff none no-repeat center/cover;background-color:#ffffff;background-image:none;background-repeat:no-repeat;background-position:center;background-size:cover;border-top:0;border-bottom:0;padding-top:0px;padding-bottom:0"
  >
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="border-collapse:collapse"
    ></table>
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="border-collapse:collapse"
    >
      <tbody>
        <tr>
          <td valign="top"></td>
        </tr>
      </tbody>
    </table>
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="min-width:100%;border-collapse:collapse"
    >
      <tbody>
        <tr>
          <td valign="top">
            <table
              align="left"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="min-width:100%;border-collapse:collapse"
            >
              <tbody>
                <tr>
                  <td
                    style="padding-top:9px;padding-left:18px;padding-bottom:9px;padding-right:18px"
                  >
                    <table
                      border="0"
                      cellspacing="0"
                      width="100%"
                      style="min-width:100%!important;border:10px solid #ffffff;border-collapse:collapse"
                    >
                      <tbody>
                        <tr>
                          <td
                            valign="top"
                            style="padding:18px;color:#241c15;font-family:Helvetica;font-size:16px;font-weight:normal;text-align:left;word-break:break-word;line-height:150%"
                          >
                            <h1 style='font-family:Helvetica,Geneva,Tahoma,Verdana,sans-serif;text-decoration:none;color:#464646;font-weight:bold'>${projectData.title}</h1>

                            <div style='overflowWrap:anywhere;minWidth:0px;font-family:Helvetica,Geneva,Tahoma,Verdana,sans-serif;line-height:28px;color:#555555;padding-top:0px;overflow-wrap: break-word; min-width: 0px;'>${projectData.description}</div>
                          </td>
                        </tr>
                        <tr>
                          <td
                            style="padding:18px;color:#241c15;font-family:Helvetica;font-size:16px;font-weight:normal;text-align:left;word-break:break-word;line-height:150%"
                            valign="top"
                          >
                            <a
                              href="https://mynigerianprojects.com/project/${projectData._id}"
                              style="background:#0060df;color:#fff;text-decoration:none;border:14px solid #0060df;border-left-width:50px;border-right-width:50px;display:inline-block"
                              target="_blank"
                            >
                              View on My Nigerian Projects
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

    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="min-width:100%;border-collapse:collapse;table-layout:fixed!important"
    >
      <tbody>
        <tr>
          <td style="min-width:100%;padding:9px 18px 18px">
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="min-width:100%;border-collapse:collapse"
            >
              <tbody>
                <tr>
                  <td>
                    <span></span>
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
<tr>
  <td
    valign="top"
    id="m_-5334885316815523950templateHeader"
    style="background:#ffffff none no-repeat center/cover;background-color:#ffffff;background-image:none;background-repeat:no-repeat;background-position:center;background-size:cover;border-top:0;border-bottom:0;padding-top:0px;padding-bottom:0"
  >
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="border-collapse:collapse"
    ></table>
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="border-collapse:collapse"
    >
      <tbody>
        <tr>
          <td valign="top"></td>
        </tr>
      </tbody>
    </table>
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="min-width:100%;border-collapse:collapse"
    >
      <tbody>
        <tr>
          <td valign="top">
            <table
              align="left"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="min-width:100%;border-collapse:collapse"
            >
              <tbody>
                <tr>
                  <td
                    style="padding-top:9px;padding-left:18px;padding-bottom:9px;padding-right:18px"
                  >
                    <table
                      border="0"
                      cellspacing="0"
                      width="100%"
                      style="min-width:100%!important;border:10px solid #ffffff;border-collapse:collapse"
                    >
                      <tbody>
                        <tr>
                          <td
                            style="padding:18px;color:#241c15;font-family:Helvetica;font-size:16px;font-weight:normal;text-align:left;word-break:break-word;line-height:150%"
                            valign="top"
                          >
                            <a href='https://mynigerianprojects.com/${projectId}/bid/${bidId}' style='background:#0060df;color:#fff;text-decoration:none;border:14px solid #0060df;border-left-width:50px;border-right-width:50px;display:inline-block' target='_blank'>
                                View Bid on My Nigerian Projects
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

    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="min-width:100%;border-collapse:collapse;table-layout:fixed!important"
    >
      <tbody>
        <tr>
          <td style="min-width:100%;padding:9px 18px 18px">
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="min-width:100%;border-collapse:collapse"
            >
              <tbody>
                <tr>
                  <td>
                    <span></span>
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
${emailFooter}`,
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

        <!-- INNER CONTENT STARTS -->
<tr>
  <td
    valign="top"
    id="m_-5334885316815523950templateHeader"
    style="background:#ffffff none no-repeat center/cover;background-color:#ffffff;background-image:none;background-repeat:no-repeat;background-position:center;background-size:cover;border-top:0;border-bottom:0;padding-top:0px;padding-bottom:0"
  >
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="border-collapse:collapse"
    ></table>
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="border-collapse:collapse"
    >
      <tbody>
        <tr>
          <td valign="top"></td>
        </tr>
      </tbody>
    </table>
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="min-width:100%;border-collapse:collapse"
    >
      <tbody>
        <tr>
          <td valign="top">
            <table
              align="left"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="min-width:100%;border-collapse:collapse"
            >
              <tbody>
                <tr>
                  <td
                    style="padding-top:9px;padding-left:18px;padding-bottom:9px;padding-right:18px"
                  >
                    <table
                      border="0"
                      cellspacing="0"
                      width="100%"
                      style="min-width:100%!important;border:10px solid #ffffff;border-collapse:collapse"
                    >
                      <tbody>
                        <tr>
                          <td
                            valign="top"
                            style="padding:18px;color:#241c15;font-family:Helvetica;font-size:16px;font-weight:normal;text-align:left;word-break:break-word;line-height:150%"
                          >
                             <h1 style='font-family:Helvetica,Geneva,Tahoma,Verdana,sans-serif;text-decoration:none;color:#464646;font-weight:bold'>${projectData.title}</h1>
                             
                              <div style='overflowWrap:anywhere;minWidth:0px;font-family:Helvetica,Geneva,Tahoma,Verdana,sans-serif;line-height:28px;color:#555555;padding-top:0px;overflow-wrap: break-word; min-width: 0px;'>${projectData.description}</div>
                          </td>
                        </tr>
                        <tr>
                          <td
                            style="padding:18px;color:#241c15;font-family:Helvetica;font-size:16px;font-weight:normal;text-align:left;word-break:break-word;line-height:150%"
                            valign="top"
                          >
                            <a
                              href="https://mynigerianprojects.com/project/${projectData._id}"
                              style="background:#0060df;color:#fff;text-decoration:none;border:14px solid #0060df;border-left-width:50px;border-right-width:50px;display:inline-block"
                              target="_blank"
                            >
                              View on My Nigerian Projects
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

    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="min-width:100%;border-collapse:collapse;table-layout:fixed!important"
    >
      <tbody>
        <tr>
          <td style="min-width:100%;padding:9px 18px 18px">
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="min-width:100%;border-collapse:collapse"
            >
              <tbody>
                <tr>
                  <td>
                    <span></span>
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
    <!-- INNER CONTENT STARTS -->
<tr>
  <td
    valign="top"
    id="m_-5334885316815523950templateHeader"
    style="background:#ffffff none no-repeat center/cover;background-color:#ffffff;background-image:none;background-repeat:no-repeat;background-position:center;background-size:cover;border-top:0;border-bottom:0;padding-top:0px;padding-bottom:0"
  >
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="border-collapse:collapse"
    ></table>
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="border-collapse:collapse"
    >
      <tbody>
        <tr>
          <td valign="top"></td>
        </tr>
      </tbody>
    </table>
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="min-width:100%;border-collapse:collapse"
    >
      <tbody>
        <tr>
          <td valign="top">
            <table
              align="left"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="min-width:100%;border-collapse:collapse"
            >
              <tbody>
                <tr>
                  <td
                    style="padding-top:9px;padding-left:18px;padding-bottom:9px;padding-right:18px"
                  >
                    <table
                      border="0"
                      cellspacing="0"
                      width="100%"
                      style="min-width:100%!important;border:10px solid #ffffff;border-collapse:collapse"
                    >
                      <tbody>
                        <tr>
                          <td
                            valign="top"
                            style="padding:18px;color:#241c15;font-family:Helvetica;font-size:16px;font-weight:normal;text-align:left;word-break:break-word;line-height:150%"
                          >
                            <h1 style='font-family:Helvetica,Geneva,Tahoma,Verdana,sans-serif;text-decoration:none;color:#464646;font-weight:bold'>
                              Hello <strong>${userData.firstName},</strong><br/>
                              </h1>

                              You have successfully created an account with My Nigerian Projects.<br>
                              Checkout your profile:
                          </td>
                        </tr>
                        <tr>
                          <td
                            style="padding:18px;color:#241c15;font-family:Helvetica;font-size:16px;font-weight:normal;text-align:left;word-break:break-word;line-height:150%"
                            valign="top"
                          >
                           <a href='https://mynigerianprojects.com/profile/${userData.username}' style='background:#0060df;color:#fff;text-decoration:none;border:14px solid #0060df;border-left-width:50px;border-right-width:50px;display:inline-block' target='_blank'>
                                View on My Nigerian Projects
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

    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="min-width:100%;border-collapse:collapse;table-layout:fixed!important"
    >
      <tbody>
        <tr>
          <td style="min-width:100%;padding:9px 18px 18px">
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="min-width:100%;border-collapse:collapse"
            >
              <tbody>
                <tr>
                  <td>
                    <span></span>
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
    <tr>
  <td
    valign="top"
    id="m_-5334885316815523950templateHeader"
    style="background:#ffffff none no-repeat center/cover;background-color:#ffffff;background-image:none;background-repeat:no-repeat;background-position:center;background-size:cover;border-top:0;border-bottom:0;padding-top:0px;padding-bottom:0"
  >
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="border-collapse:collapse"
    ></table>
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="border-collapse:collapse"
    >
      <tbody>
        <tr>
          <td valign="top"></td>
        </tr>
      </tbody>
    </table>
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="min-width:100%;border-collapse:collapse"
    >
      <tbody>
        <tr>
          <td valign="top">
            <table
              align="left"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="min-width:100%;border-collapse:collapse"
            >
              <tbody>
                <tr>
                  <td
                    style="padding-top:9px;padding-left:18px;padding-bottom:9px;padding-right:18px"
                  >
                    <table
                      border="0"
                      cellspacing="0"
                      width="100%"
                      style="min-width:100%!important;border:10px solid #ffffff;border-collapse:collapse"
                    >
                      <tbody>
                        <tr>
                          <td
                            valign="top"
                            style="padding:18px;color:#241c15;font-family:Helvetica;font-size:16px;font-weight:normal;text-align:left;word-break:break-word;line-height:150%"
                          >
                            <h1 style='font-family:Helvetica,Geneva,Tahoma,Verdana,sans-serif;text-decoration:none;color:#464646;font-weight:bold'>
                              Hello <strong>${userData.firstName},</strong><br/>
                              </h1>
                              You have successfully changed your password.
                          </td>
                        </tr>
                        <tr>
                          <td
                            style="padding:18px;color:#241c15;font-family:Helvetica;font-size:16px;font-weight:normal;text-align:left;word-break:break-word;line-height:150%"
                            valign="top"
                          >
                           If you did not changed your password, secure your account by resetting your password:
                           </td>
                          <td
                            style="padding:18px;color:#241c15;font-family:Helvetica;font-size:16px;font-weight:normal;text-align:left;word-break:break-word;line-height:150%"
                            valign="top"
                          >
                             <a href='https://mynigerianprojects.com/reset-password' style='background:#0060df;color:#fff;text-decoration:none;border:14px solid #0060df;border-left-width:50px;border-right-width:50px;display:inline-block' target='_blank'>
                                 Secure My Account Now
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

    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="min-width:100%;border-collapse:collapse;table-layout:fixed!important"
    >
      <tbody>
        <tr>
          <td style="min-width:100%;padding:9px 18px 18px">
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="min-width:100%;border-collapse:collapse"
            >
              <tbody>
                <tr>
                  <td>
                    <span></span>
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
    <tr>
  <td
    valign="top"
    id="m_-5334885316815523950templateHeader"
    style="background:#ffffff none no-repeat center/cover;background-color:#ffffff;background-image:none;background-repeat:no-repeat;background-position:center;background-size:cover;border-top:0;border-bottom:0;padding-top:0px;padding-bottom:0"
  >
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="border-collapse:collapse"
    ></table>
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="border-collapse:collapse"
    >
      <tbody>
        <tr>
          <td valign="top"></td>
        </tr>
      </tbody>
    </table>
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="min-width:100%;border-collapse:collapse"
    >
      <tbody>
        <tr>
          <td valign="top">
            <table
              align="left"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="min-width:100%;border-collapse:collapse"
            >
              <tbody>
                <tr>
                  <td
                    style="padding-top:9px;padding-left:18px;padding-bottom:9px;padding-right:18px"
                  >
                    <table
                      border="0"
                      cellspacing="0"
                      width="100%"
                      style="min-width:100%!important;border:10px solid #ffffff;border-collapse:collapse"
                    >
                      <tbody>
                        <tr>
                          <td
                            valign="top"
                            style="padding:18px;color:#241c15;font-family:Helvetica;font-size:16px;font-weight:normal;text-align:left;word-break:break-word;line-height:150%"
                          >
                            <h1 style='font-family:Helvetica,Geneva,Tahoma,Verdana,sans-serif;text-decoration:none;color:#464646;font-weight:bold'>
                              Hello <strong>${userData.firstName},</strong><br/>
                              </h1>
                              So sorry to see you go but you have successfully deleted your account.
                          </td>
                          <td
                            valign="top"
                            style="padding:18px;color:#241c15;font-family:Helvetica;font-size:16px;font-weight:normal;text-align:left;word-break:break-word;line-height:150%"
                          >
                               If you change your mind, please create an account and help me and others fullfil our projects in Nigeria and earn some money too:
                            </td>
                        </tr>
                        <tr>
                          <td
                            style="padding:18px;color:#241c15;font-family:Helvetica;font-size:16px;font-weight:normal;text-align:left;word-break:break-word;line-height:150%"
                            valign="top"
                          >
                              <a href='https://mynigerianprojects.com/register' style='background:#0060df;color:#fff;text-decoration:none;border:14px solid #0060df;border-left-width:50px;border-right-width:50px;display:inline-block' target='_blank'>
                                 Create Account
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

    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="min-width:100%;border-collapse:collapse;table-layout:fixed!important"
    >
      <tbody>
        <tr>
          <td style="min-width:100%;padding:9px 18px 18px">
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="min-width:100%;border-collapse:collapse"
            >
              <tbody>
                <tr>
                  <td>
                    <span></span>
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
<tr>
  <td
    valign="top"
    id="m_-5334885316815523950templateHeader"
    style="background:#ffffff none no-repeat center/cover;background-color:#ffffff;background-image:none;background-repeat:no-repeat;background-position:center;background-size:cover;border-top:0;border-bottom:0;padding-top:0px;padding-bottom:0"
  >
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="border-collapse:collapse"
    ></table>
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="border-collapse:collapse"
    >
      <tbody>
        <tr>
          <td valign="top"></td>
        </tr>
      </tbody>
    </table>
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="min-width:100%;border-collapse:collapse"
    >
      <tbody>
        <tr>
          <td valign="top">
            <table
              align="left"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="min-width:100%;border-collapse:collapse"
            >
              <tbody>
                <tr>
                  <td
                    style="padding-top:9px;padding-left:18px;padding-bottom:9px;padding-right:18px"
                  >
                    <table
                      border="0"
                      cellspacing="0"
                      width="100%"
                      style="min-width:100%!important;border:10px solid #ffffff;border-collapse:collapse"
                    >
                      <tbody>
                        <tr>
                          <td
                            valign="top"
                            style="padding:18px;color:#241c15;font-family:Helvetica;font-size:16px;font-weight:normal;text-align:left;word-break:break-word;line-height:150%"
                          >
                          <h1 style='font-family:Helvetica,Geneva,Tahoma,Verdana,sans-serif;text-decoration:none;color:#464646;font-weight:bold'>
                    Hello <strong>${userData.profileName},</strong><br/>
                    </h1>
                    ${userData.followerName}, just followed you. 
                          </td>
                           <td
                            valign="top"
                            style="padding:18px;color:#241c15;font-family:Helvetica;font-size:16px;font-weight:normal;text-align:left;word-break:break-word;line-height:150%"
                          >
                            Go to your profile and manage your followers:
                        </td>
                          </tr>
                        <tr>
                          <td
                            style="padding:18px;color:#241c15;font-family:Helvetica;font-size:16px;font-weight:normal;text-align:left;word-break:break-word;line-height:150%"
                            valign="top"
                          >
                              <a href='https://mynigerianprojects.com/profile/${profileUsername}/followers' style='background:#0060df;color:#fff;text-decoration:none;border:14px solid #0060df;border-left-width:50px;border-right-width:50px;display:inline-block' target='_blank'>
                        View My Profile
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

    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="min-width:100%;border-collapse:collapse;table-layout:fixed!important"
    >
      <tbody>
        <tr>
          <td style="min-width:100%;padding:9px 18px 18px">
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="min-width:100%;border-collapse:collapse"
            >
              <tbody>
                <tr>
                  <td>
                    <span></span>
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
${emailFooter}
          `,
  };
  transporter.sendMail(data, (err, info) => {
    if (err) console.log(err);
    else console.log('Follow Success Sent Via Email: ' + info.response);
  });
};

// SOME VARIABLES

const emailHeader = ` <table
      align="center"
      border="0"
      cellpadding="0"
      cellspacing="0"
      height="100%"
      width="100%"
      id="m_-5334885316815523950bodyTable"
      style="border-collapse:collapse;height:100%;margin:0;padding:0;width:100%;background-color:#efeeea"
    >
      <tbody>
        <tr>
          <td
            align="center"
            valign="top"
            style="height:100%;margin:0;padding:10px;width:100%;border-top:0"
          >
            <!-- BEGIN OF FIRST TABLE CONTENT OR TD -->

            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="border-collapse:collapse;border:0;max-width:600px!important"
            >
              <tbody>
                <!-- HEADER STARTS-->
                <tr>
                  <td
                    valign="top"
                    id="m_-5334885316815523950templatePreheader"
                    style="background:#ffffff none no-repeat center/cover;background-color:#ffffff;background-image:none;background-repeat:no-repeat;background-position:center;background-size:cover;border-top:0;border-bottom:0;padding-top:0px;padding-bottom:0px"
                  >
                    <!-- CUSHION -->
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                      style="border-collapse:collapse"
                    >
                      <tbody>
                        <tr>
                          <td valign="top">
                            <span
                              style="color:#ffffff;display:none;font-size:0px;height:0px;width:0px"
                              >&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;<wbr />&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;<wbr />&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;<wbr />&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;<wbr />&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;<wbr />&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;<wbr />&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;<wbr />&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;<wbr />&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;<wbr />&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;<wbr />&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;<wbr />&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;<wbr />&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;<wbr />&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;<wbr />&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;<wbr />&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;<wbr />&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;<wbr />&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;<wbr />&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;<wbr />&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;<wbr />&nbsp;&zwnj;&nbsp;</span
                            >
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <!-- CONTENT -->
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                      style="min-width:100%;border-collapse:collapse"
                    >
                      <tbody>
                        <tr>
                          <td valign="top" style="padding:0px">
                            <table
                              align="left"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              style="min-width:100%;border-collapse:collapse"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    valign="top"
                                    style="padding-right:0px;padding-left:0px;padding-top:0;padding-bottom:0;text-align:center"
                                  >
                                    <a
                                      href="https://mynigerianprojects.com"
                                      title="My Nigerian Projects"
                                      target="_blank"
                                    >
                                      <img
                                        align="center"
                                        alt="headerPic"
                                        src="https://i.ibb.co/8Y5hL2d/bgg.jpg"
                                        width="600"
                                        style="max-width:1200px;padding-bottom:0;display:inline!important;vertical-align:bottom;border:0;height:150px;outline:none;text-decoration:none"
                                        class=""
                                      />
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
                </tr> `;

const emailFooter = `
                <tr>
                  <td
                    valign="top"
                    style="background:#ffffff none no-repeat center/cover;background-color:#ffffff;background-image:none;background-repeat:no-repeat;background-position:center;background-size:cover;border-top:0;border-bottom:0;padding-top:0;padding-bottom:0px"
                  ></td>
                </tr>
                <!-- FOOTER CONTENT CONTAINER-->
                <tr>
                  <td
                    valign="top"
                    id="m_-5334885316815523950templateFooter"
                    style="background:#000000 none no-repeat center/cover;background-color:#000000;background-image:none;background-repeat:no-repeat;background-position:center;background-size:cover;border-top:0;border-bottom:0;padding-top:0px;padding-bottom:0px"
                  >
                    <!-- FOOTER CONTENT-->
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                      style="min-width:100%;border-collapse:collapse"
                    >
                      <tbody>
                        <tr>
                          <td valign="top" style="padding-top:9px">
                            <table
                              align="left"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              style="max-width:100%;min-width:100%;border-collapse:collapse"
                              width="100%"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    valign="top"
                                    style="padding-top:0;padding-right:18px;padding-bottom:9px;padding-left:18px;word-break:break-word;color:#241c15;font-family:Helvetica;font-size:12px;line-height:150%;text-align:center"
                                  >
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      style="border-collapse:collapse"
                                    >
                                      <tbody>
                                        <tr>
                                          <td align="center" valign="top">
                                            <table
                                              align="center"
                                              border="0"
                                              cellpadding="0"
                                              cellspacing="0"
                                              style="max-width:565px;width:100%;border-collapse:collapse"
                                            >
                                              <tbody>
                                                <!-- why you are receiving this email -->

                                                <tr>
                                                  <td
                                                    align="center"
                                                    style="color:#ffffff;font-family:'Helvetica Neue',Helvetica,Arial,Verdana,sans-serif;font-size:12px;padding:18px 0;line-height:1.5"
                                                    valign="top"
                                                  >
                                                    <span
                                                      style="color:#ffffff;text-decoration:none;font-weight:normal"
                                                      target="_blank"
                                                      >You're receiving this
                                                      email because you are a
                                                      member of My Nigerian
                                                      Projects. If you prefer
                                                      not to be included in
                                                      future emails please reach
                                                      out to me at
                                                    </span>

                                                    <a
                                                      href="mailto:thebiddingapp@gmail.com."
                                                      style="color:#ffffff;text-decoration:none;font-weight:normal"
                                                    >
                                                      thebiddingapp@gmail.com
                                                    </a>
                                                  </td>
                                                </tr>

                                                <!-- ADDRESS -->
                                                <tr>
                                                  <td
                                                    align="center"
                                                    style="color:#ffffff;font-family:'Helvetica Neue',Helvetica,Arial,Verdana,sans-serif;font-size:12px;padding:18px 0;line-height:1.5"
                                                    valign="top"
                                                  >
                                                    <strong
                                                      >©2020 My Nigerian
                                                      Projects</strong
                                                    ><br />
                                                    <span
                                                      style="color:#ffffff;text-decoration:none;font-weight:normal"
                                                      >PO Box 511, Charles City,
                                                      Iowa 50616
                                                    </span>
                                                    |
                                                    <a
                                                      href="https://mailchimp.us1.list-manage.com/track/click?u=f7b9ee22124ff6454424dc10c&amp;id=aa0a7d260c&amp;e=dda3a809d4"
                                                      style="color:#ffffff;text-decoration:none;font-weight:normal"
                                                      target="_blank"
                                                      data-saferedirecturl="https://www.google.com/url?q=https://mailchimp.us1.list-manage.com/track/click?u%3Df7b9ee22124ff6454424dc10c%26id%3Daa0a7d260c%26e%3Ddda3a809d4&amp;source=gmail&amp;ust=1594776346850000&amp;usg=AFQjCNFRQ80KgC0lR3Fhn_BrOpKpwipbBg"
                                                    >
                                                      mynigerianprojects.com
                                                    </a>
                                                  </td>
                                                </tr>
                                                <!--  terms and privacy -->
                                                <tr>
                                                  <td
                                                    align="center"
                                                    style="padding:4px 0"
                                                    valign="top"
                                                  >
                                                    <p
                                                      style="color:#ffffff;font-family:'Helvetica Neue',Helvetica,Arial,Verdana,sans-serif;font-size:12px;margin:10px 0;padding:0;line-height:150%;text-align:center"
                                                    >
                                                      <a
                                                        href="https://mynigerianprojects.com/terms"
                                                        style="color:#ffffff;text-decoration:underline;font-weight:normal"
                                                        target="_blank"
                                                      >
                                                        Terms of Use </a
                                                      >•
                                                      <a
                                                        href="https://mynigerianprojects.com/privacy"
                                                        style="color:#ffffff;text-decoration:underline;font-weight:normal"
                                                        target="_blank"
                                                      >
                                                        Privacy Policy
                                                      </a>
                                                    </p>
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
                <!-- FOOTER ENDS-->
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>`;

// EXPORT CODE
module.exports = Email;
