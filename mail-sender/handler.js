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

const ALLOWED_ORIGINS = [
  'https://rhythmicexcellence.london',
  'https://www.rhythmicexcellence.london',
];

const returnCallback = (body, statusCode = 500, cors = false) => {
  if (!(statusCode < 300 && statusCode >= 200)) {
    body = { name: body.name, message: body.message };
  }

  const headers = {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'OPTIONS,POST',
    'Access-Control-Allow-Origin': ALLOWED_ORIGINS,
    'Access-Control-Allow-Credentials': true,
  };
  if (cors) {
    headers['Access-Control-Allow-Origin'] = '*';
  } else {
    headers['Access-Control-Allow-Credentials'] = true;
  }

  return {
    statusCode,
    headers,
    body: JSON.stringify(body),
  };
};

module.exports.send = async (event, context, callback) => {
  let data;

  const { headers, body } = event;

  console.warn(ALLOWED_ORIGINS.includes(origin));
  const origin = headers.Origin || headers.origin;

  if (!ALLOWED_ORIGINS.includes(origin)) {
    return returnCallback({}, 401, true);
  }

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

  const response = returnCallback({ status: 'success' }, 200);
  callback(null, response);
};
