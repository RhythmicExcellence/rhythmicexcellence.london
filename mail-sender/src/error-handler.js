// Copyright (c) 2018-2022 AndreaSonny <andreasonny83@gmail.com> (https://github.com/andreasonny83)
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

class EmailSenderError extends Error {
  constructor(...params) {
    super(...params);
    this.name = 'EmailSenderError';
    Error.captureStackTrace(this, EmailSenderError);
  }
}

module.exports.EmailSenderError = EmailSenderError;
