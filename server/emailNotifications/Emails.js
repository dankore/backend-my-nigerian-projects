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
  const data = {
    from: '"The Bidding App" <thebiddingapp@gmail.com>',
    to: projectData.email,
    subject: `Your project, ${
      projectData.title
    }, was created - The Bidding App`,
    html: `<div style="background:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:1em">
    <table id="m_-1754539424995552259backgroundTable" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#ffffff">
        <tbody><tr>
            <td align="center" valign="top" style="background:#ffffff" width="100%">
                <table cellpadding="0" cellspacing="0">
                    <tbody><tr>
                        <td width="640">
                            <table style="background-color:transparent;min-width:100%" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td style="padding:11px"><table width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td align="center"><a href="https://click.e.mozilla.org/?qs=2c8d0a61f4cf2e39b7bb139a7c61c10a27dcc1e6d145fd1acd95bc89c989f40de2d40825c364650f89049a482add81eb112a0ee5be4de472" title="MDN Web Docs" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://click.e.mozilla.org/?qs%3D2c8d0a61f4cf2e39b7bb139a7c61c10a27dcc1e6d145fd1acd95bc89c989f40de2d40825c364650f89049a482add81eb112a0ee5be4de472&amp;source=gmail&amp;ust=1593570060273000&amp;usg=AFQjCNFqoH32-Qarfg9jS_6dWj-YfcCH1g"><img src="https://ci4.googleusercontent.com/proxy/prOW3MzzBuJlYPD25ZOFUmQn9QkGMj3MhGwVQlStBuyPwpW-OoaNw9g3hEV0ET2dcVNd_AisYGxyLLQ5l3mWvqKaXnhFsMpYsZb5PM4ppATHNhpEe9xSpISNnoMe5CMPhkfrJUqoyONgzFFD6O7FX8Yt=s0-d-e1-ft#https://image.e.mozilla.org/lib/fe9915707361037e75/m/3/6f6ace74-1303-44c1-b599-e44cec1c0b6a.png" alt="Mozilla Developer Newsletter" style="display:block;padding:0px;text-align:center;height:auto;width:100%" width="650" class="CToWUd"></a></td></tr>
</tbody></table></td></tr></tbody></table></td>
                    </tr>
                    <tr>
                        <td width="640" align="center" style="padding:0 10px">
                            <table style="min-width:100%" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td><table cellspacing="0" cellpadding="0" bgcolor="#ffffff">
<tbody><tr>
<td style="padding:32px 30px 45px">





  
<h1 style="font-family:Helvetica,Geneva,Tahoma,Verdana,sans-serif;text-decoration:none;color:#464646;line-height:34px;font-size:22px;font-weight:bold">
  ${projectData.title}
</h1>



<br><br>
<span style="font-family:Helvetica,Geneva,Tahoma,Verdana,sans-serif;font-size:16px;line-height:28px;color:#555555;padding-top:0px">
${projectData.description}
</span>
</td></tr>
<tr>
          
<td style="font-family:Helvetica,Geneva,Tahoma,Verdana,sans-serif;font-size:16px;padding:0px 30px 45px" align="left">
 
<a href="https://bidding.netlify.app/${
      projectData._id
    }" style="background:#0060df;color:#fff;text-decoration:none;border:14px solid #0060df;border-left-width:50px;border-right-width:50px;display:inline-block" target="_blank">
Read More . . . 
</a>  
</td>


</tr>

</tbody></table><br>


  </td></tr></tbody></table>

   
 <table cellspacing="0" cellpadding="0">
       <tbody><tr>
                     <td width="640" align="center" style="padding-top:10px;background-color:#000000">

       <table cellspacing="0" cellpadding="0">
                       <tbody><tr>
                        <td align="center" style="font-family:Helvetica,Geneva,Tahoma,Verdana,sans-serif;font-size:14px;line-height:18px;color:#ffffff;padding:0 20px 30px">
                                      
          <br><br>You're receiving this email because you are a member of the Bidding App.<br><br>
                                  </td>
                                </tr>
          </tbody></table>
                                <table cellspacing="0" cellpadding="0">
                       <tbody><tr>
                        <td align="center" style="font-family:Helvetica,Geneva,Tahoma,Verdana,sans-serif;font-size:14px;line-height:18px;color:#ffffff;padding:0 20px 40px">
                         
                          <br>
                            <a href="https://bidding.netlify.app/register" style="color:#ffffff;font-weight:bold" target="_blank">Join The Bidding App</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="https://bidding.netlify.app/login" style="color:#ffffff;font-weight:bold" target="_blank>Login</a>
                          <br>
                            <br>
                          <br>
                         PO Box 511, Charles City, Iowa 50616
                         <br>
                         <a href="https://bidding.netlify.app/terms" style="color:#ffffff" target="_blank">Terms</a> • <a href="https://bidding.netlify.app/privacy" style="color:#ffffff" target="_blank">Privacy</a>
                          
                            </td>
                       </tr>
                      </tbody></table>
                     </td>
          </tr>
        </tbody></table>
    </td>
    </tr>
           </tbody></table>              
                       
                       
                     </td>
                    </tr>
                          </tbody></table>
                        
                
      </td>
    </tr></tbody></table>
          </td></tr></tbody></table>
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
