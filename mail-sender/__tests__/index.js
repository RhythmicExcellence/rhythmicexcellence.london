// Copyright (c) 2018-2022 AndreaSonny <andreasonny83@gmail.com> (https://github.com/andreasonny83)
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const sendMail = require('../src/index');
const { EmailSenderError } = require('../src/error-handler');
const { MailSender } = require('../src/mail-sender');
const { Log } = require('../src/log');

jest.mock('../src/mail-sender');
jest.mock('../src/log');

describe('sendMail', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    MailSender.mockClear();
  });

  it(`should receive a 'data' object`, async () => {
    // Arrange
    const sender = 'sender';
    const email = 'valid@email.com';
    const body = 'body';

    const data = { sender, email, body };

    // Act
    await sendMail({ data, from: 'from@email.com', to: 'to', subject: 'subject' });

    // Assert
    expect(MailSender).toHaveBeenCalled();
    expect(Log).toHaveBeenCalled();
  });

  it(`should throw an 'Invalid data' error if any of the required filed is missing`, async () => {
    // Arrange
    const sender = 'sender';
    const email = 'email';
    const body = 'body';

    const data1 = { sender: '', email: '', body: '' };
    const data2 = { sender, email: '', body: '' };
    const data3 = { sender, email, body: '' };
    const data4 = { sender, email, body };
    const data5 = { sender, email, body };

    let errors = [];

    // Act
    try {
      await sendMail(data1);
    } catch (err) {
      errors.push(err);
    }
    try {
      await sendMail(data2);
    } catch (err) {
      errors.push(err);
    }
    try {
      await sendMail(data3);
    } catch (err) {
      errors.push(err);
    }
    try {
      await sendMail(data4);
    } catch (err) {
      errors.push(err);
    }
    try {
      await sendMail(data5);
    } catch (err) {
      errors.push(err);
    }

    // Assert
    expect(errors.length).toBe(5);
  });

  it(`should send an email`, async () => {
    // Arrange
    const fakeSend = jest.fn(() => {
      Promise.resolve('ok');
    });

    MailSender.mockImplementation(() => ({
      send: fakeSend,
      sendConfirmation: jest.fn(),
    }));

    const sender = 'sender';
    const email = 'valid@email.com';
    const body = 'body';

    const data = { sender, email, body };

    // Act
    try {
      await sendMail({ data, from: 'from@email.com', to: 'to', subject: 'subject' });
    } catch (err) {
      console.log('error', err);
    }

    // Assert
    expect(fakeSend).toHaveBeenCalledWith({
      ...data,
      from: 'from@email.com',
      to: 'to',
      subject: 'subject',
    });
  });

  it(`should return an error`, async () => {
    // Arrange
    const fakeSend = jest.fn(() => {
      return Promise.reject('email delivery failed');
    });

    MailSender.mockImplementation(() => ({
      send: fakeSend,
    }));

    const data = {
      sender: 'sender',
      email: 'valid@email.com',
      body: 'body',
    };

    // Act
    try {
      await sendMail({ data, from: 'from@email.com', to: 'to', subject: 'subject' });

      // Make sure we never reach the following line
      expect(false).toBeTruthy();
    } catch (err) {
      // Assert
      expect(err).toEqual(new EmailSenderError('email delivery failed'));
    }
  });
});
