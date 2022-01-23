// Copyright (c) 2018-2022 AndreaSonny <andreasonny83@gmail.com> (https://github.com/andreasonny83)
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

class MailSender {
  constructor(AWS, EmailGenerator) {
    this.ses = new AWS.SES();
    this.emailGenerator = new EmailGenerator();
  }

  async send(emailObject) {
    const { subject, body, branch, from, to, sender, email } = emailObject;
    const emailFormattedObject = this._prepareEmail(subject, body, branch, from, to, sender, email);

    try {
      await this._sendEmail(emailFormattedObject);
    } catch (err) {
      throw new Error(err);
    }
  }

  async sendConfirmation(emailObject) {
    const { subject, from, to } = emailObject;
    const emailFormattedObject = this._prepareConfirmationEmail(subject, from, to);

    try {
      await this._sendEmail(emailFormattedObject);
    } catch (err) {
      throw new Error(err);
    }
  }

  async _sendEmail(emailObject) {
    return await this.ses.sendEmail(emailObject).promise();
  }

  _prepareEmail(subject, body, branch, from, to, sender, email) {
    return this.emailGenerator.generate(subject, body, branch, from, to, sender, email);
  }

  _prepareConfirmationEmail(subject, from, to) {
    return this.emailGenerator.generateConfirmation(subject, from, to);
  }
}

module.exports.MailSender = MailSender;
