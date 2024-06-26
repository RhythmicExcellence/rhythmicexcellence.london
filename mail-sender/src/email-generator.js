// Copyright (c) 2018-2022 AndreaSonny <andreasonny83@gmail.com> (https://github.com/andreasonny83)
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

class EmailGenerator {
  constructor(charset = 'UTF-8') {
    this._charset = charset;
  }

  generate(...params) {
    const newParams = [this._charset, ...params];

    return this._generate(...newParams);
  }

  generateConfirmation(...params) {
    const newParams = [this._charset, ...params];

    return this._generateConfirmationMail(...newParams);
  }

  _generateConfirmationBody() {
    const body = `
    Thank you for contacting us!

    We have received your message. One of our team members will get in touch with you shortly.
    `;

    const footer = `
    This is an automatic e-mail generated from https://rhythmicexcellence.london
    Please, don't reply to this email.`;

    const message = `
      ${body}
      ${footer}
      `;

    return message;
  }

  _generateBody(isHtml, sender, from, body) {
    const date = new Date().toUTCString();
    const footer = `
    This is an automatic e-mail generated from ${(isHtml &&
      '<a href="https://www.rhythmicexcellence.london" target="_blank">www.rhythmicexcellence.london</a>') ||
      'https://rhythmicexcellence.london'}<br/>
    If you do not wish to continue receiving these messages or for other queries, please contact your web administrator at: ${(isHtml &&
      '<a href="mailto:andreasonny83@gmail.com" target="_blank">andreasonny83@gmail.com</a>.') ||
      'andreasonny83@gmail.com .'}`;

    const message =
      (isHtml &&
        `
<html><head><title>RhythmicExcellence.london</title></head>
  <body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0">
    <center>
      <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
        <tr><td align="center" valign="top" style="padding-bottom:40px;">
          <table border="0" cellpadding="0" cellspacing="0" width="600" id="templateContainer">
            <tr><td align="center" valign="top" style="padding-bottom:20px;">
              <table border="0" cellpadding="0" cellspacing="0" width="600" id="templatePreheader"></table>
            </td></tr>
            <tr><td align="center" valign="top">
              <table border="0" cellpadding="0" cellspacing="0" width="600" id="templateHeader">
                <tr><td align="center" valign="top" style="padding-top:20px; padding-bottom:20px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr><td class="headerContent" mc:edit="header_content">
                      <h1>Hi RhythmicExcellence,<br />
                        <span style="font-size:30px">${sender} has just left you a message:</span>
                      </h1>
                      <br />
                      Date: ${date}<br/>
                      From: ${from}<br/>
                    </td></tr>
                  </table>
                </td></tr>
              </table>
            </td></tr>
            <tr><td align="center" valign="top">
              <table border="0" cellpadding="40" cellspacing="0" width="600" id="templateBody">
                <tr><td align="center" valign="top" style="padding-top:20px; padding-bottom:20px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr><td valign="top" class="upperBodyContent" mc:edit="body_content01">
                      ${body}
                    </td></tr>
                  </table>
                </td></tr>
              </table>
            </td></tr>
            <tr><td align="center" valign="top">
              <table border="0" cellpadding="20" cellspacing="0" width="600" id="templateFooter">
                <tr><td align="center" valign="top" style="padding-right:40px; padding-left:40px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr><td valign="top" class="footerContent" style="border-top:1px solid #BBBBBB; padding-top:20px;" mc:edit="footer_social"></td></tr>
                    <tr><td valign="top" class="footerContent" style="padding-top:20px;" mc:edit="footer_utility">
                      ${footer}
                    </td></tr>
                  </table>
                </td></tr>
              </table>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </center>
  </body>
</html>`) ||
      `
      From: ${from} <${sender}> <br/>
      Date: ${date} <br/>
      Message: ${body} <br/>
      Footer: ${footer} <br/>
      `;

    return message;
  }

  _generate(charset, subject, body, from, to, sender, email) {
    const Charset = charset;
    const messageHtml = this._generateBody(true, sender, email, body);
    const messageText = this._generateBody(false, sender, email, body);

    return {
      Destination: {
        ToAddresses: [to],
      },
      Source: from,
      Message: {
        Subject: {
          Data: subject,
          Charset,
        },
        Body: {
          Html: {
            Data: messageHtml,
            Charset,
          },
          Text: {
            Data: messageText,
            Charset,
          },
        },
      },
    };
  }

  _generateConfirmationMail(charset, subject, from, to) {
    const Charset = charset;
    const messageText = this._generateConfirmationBody();

    return {
      Destination: {
        ToAddresses: [to],
      },
      Source: from,
      Message: {
        Subject: {
          Data: subject,
          Charset,
        },
        Body: {
          Text: {
            Data: messageText,
            Charset,
          },
        },
      },
    };
  }
}

module.exports.EmailGenerator = EmailGenerator;
