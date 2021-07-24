// Copyright (c) 2018-2019 AndreaSonny <andreasonny83@gmail.com> (https://github.com/andreasonny83)
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const sendMail = require('./src/index');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const from = process.env.FROM;
const toTestEmail = process.env.EMAIL_TEST;
const toKensington = process.env.EMAIL_KENSINGTON;
const toHackney = process.env.EMAIL_HACKNEY;
const subject = process.env.SUBJECT;
const debug = process.env.DEBUG === 'true';
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');

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

module.exports.send = async (event, context) => {
  const { headers, body } = event;
  const origin = headers.Origin || headers.origin;

  if (!allowedOrigins.includes(origin)) {
    console.log(`Unauthorised request from ${origin}`);
    return returnCallback({}, 401, true);
  }

  let data;
  try {
    data = JSON.parse(body);
  } catch (err) {
    return returnCallback({
      name: 'SyntaxError',
      message:
        'body is missing in the event or is not parsable to JSON.\n' +
        err.message,
    });
  }

  const { branch } = data;
  const trimmedBranch = `${branch}`.trim().toLowerCase();
  const to =
    (trimmedBranch === 'kensington' && toKensington) ||
    (trimmedBranch === 'hackney' && toHackney) ||
    (trimmedBranch === 'test' && toTestEmail);

  try {
    await sendMail(data, from, to, subject, debug);
  } catch (err) {
    return returnCallback(err);
  }

  return returnCallback({ status: 'success' }, 200, false, origin);
};
