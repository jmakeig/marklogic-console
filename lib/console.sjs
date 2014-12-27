'use strict';
var util = require('node/util');
var Console = require('node/console').Console;
var adapter = require('log');

// Override warn and error to log the appropriate level
Console.prototype.warn = function() {
  this._stderr.write(util.format.apply(this, arguments) + '\n', 'warning');
};
Console.prototype.error = function() {
  this._stderr.write(util.format.apply(this, arguments) + '\n', 'error');
};

module.exports = new Console(adapter, adapter);