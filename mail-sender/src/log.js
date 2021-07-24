// Copyright (c) 2018-2019 AndreaSonny <andreasonny83@gmail.com> (https://github.com/andreasonny83)
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

class Log {
  constructor(debugStatus = false) {
    this.debugStatus = debugStatus;
  }

  info(title, body) {
    console.log(title);
    if (this.debugStatus && body) {
      console.log(body);
    }
  }
}

module.exports.Log = Log;
