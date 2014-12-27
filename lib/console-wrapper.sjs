'use strict';
var util = require('util');
var adapter = require('log');
var Console = require('console').Console;

// Override warn and error to log the appropriate level
Console.prototype.warn = function() {
  this._stderr.write(util.format.apply(this, arguments) + '\n', 'warning');
};
Console.prototype.error = function() {
  this._stderr.write(util.format.apply(this, arguments) + '\n', 'error');
};

module.exports = new Console(adapter, adapter);