// Copyright (c) 2018-2022 AndreaSonny <andreasonny83@gmail.com> (https://github.com/andreasonny83)
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const sendMail = require('./src/index');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const from = process.env.FROM;
const to = process.env.EMAIL_HACKNEY;
const subject = process.env.SUBJECT;
const confirmationSender = process.env.CONFIRMATION_SENDER;
const confirmationSubject = process.env.CONFIRMATION_SUBJECT;
const debug = process.env.DEBUG === 'true';
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');
const isDev = process.env.NODE_ENV === 'development';

const returnCallback = (body, statusCode = 500, cors = false, origin = '') => {
  if (!(statusCode < 300 && statusCode >= 200)) {
    body = { name: body.name, message: body.message };
  }

  const headers = {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'OPTIONS,POST',
  };

  if (!cors) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers['Access-Control-Allow-Credentials'] = true;
  }

  return {
    statusCode,
    headers,
    body: JSON.stringify(body),
  };
};

module.exports.send = async (event, _context) => {
  const { headers, body } = event;
  const origin = headers.Origin || headers.origin;

  if (!allowedOrigins.includes(origin) && !isDev) {
    console.log(`Unauthorised request from ${origin}`);
    return returnCallback({}, 401, true);
  }

  let data;
  try {
    data = JSON.parse(body);
    if (!data) {
      throw new Error();
    }
  } catch (err) {
    return returnCallback({
      name: 'SyntaxError',
      message: `body is missing in the event or is not parsable to JSON.\n${err.message}` || err,
    });
  }

  try {
    await sendMail({
      data,
      from,
      to,
      subject,
      confirmationSender,
      confirmationSubject,
      debug,
    });
  } catch (err) {
    console.warn(err.message || err);
    return returnCallback(err);
  }

  return returnCallback({ status: 'success' }, 200, false, origin);
};
